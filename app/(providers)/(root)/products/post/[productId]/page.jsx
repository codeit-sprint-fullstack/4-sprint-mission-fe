'use client';

import api from '@/api';
import icX from '@/assets/images/ic-x.png';
import icPlus from '@/assets/images/ic_plus.png';
import AlertModal from '@/components/common/AlertModal';
import Button from '@/components/common/Button';
import Loader from '@/components/common/Loader';
import PageContainer from '@/components/common/Page';
import TagChip from '@/components/common/TagChip';
import { useAuth } from '@/contexts/AuthContext';
import { useModal } from '@/contexts/ModalContext';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

function ProductEditPage() {
  const params = useParams();
  const productId = params.productId;
  const queryClient = useQueryClient();

  const { data: product } = useQuery({
    queryKey: ['product', { productId }],
    queryFn: () => api.getProduct(productId),
    // retry: 0,
  });

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      name: product.name,
      description: product.description,
      price: product.price,
      tag: '',
    },
  });
  const modal = useModal();
  const { isLoggedIn, userInfo } = useAuth();
  const [tags, setTags] = useState(product.tags);
  const router = useRouter();
  const fileInputRef = useRef();
  const [pickedImages, setPickedImages] = useState([]);
  const [imgUrls, setImgUrls] = useState(product.imgUrls);

  const isTagsNotEmpty = tags.length !== 0;
  const pickedImagesNotEmpty = pickedImages.length !== 0;
  const isPossibleRegist = isValid && isTagsNotEmpty && pickedImagesNotEmpty;

  const { mutate: editProduct, isPending } = useMutation({
    mutationFn: (dto) => api.editProduct(productId, dto),
    onSuccess: () => {
      function handleClickSuccess() {
        router.replace(`/products`);
        // router.replace(`/products/${productId}`);
        modal.close();
      }
      // 상품 수정 후 상품 상세와 목록을 갱신
      // queryClient.invalidateQueries({ queryKey: ['product', { productId }] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
      modal.open(
        <AlertModal
          alertMessage="상품이 정상적으로 수정되었습니다."
          onClick={handleClickSuccess}
        />
      );
    },
  });

  const handleClickModalConfirm = () => {
    router.replace('/auth/log-in');
    modal.close();
  };

  const checkIsLoggedIn = () => {
    if (!isLoggedIn)
      return modal.open(
        <AlertModal
          alertMessage="로그인이 필요한 서비스입니다."
          onClick={handleClickModalConfirm}
        />
      );
  };

  const handleClickRegister = () => {
    if (!isPossibleRegist) return;
    checkIsLoggedIn();
  };

  const onSubmit = (dto) => {
    if (!isLoggedIn || !isPossibleRegist) return;
    const { name, description, price } = dto;
    const reqData = {
      name,
      description,
      tags,
      writer: userInfo.nickname,
      price: Number(price),
      images: pickedImages,
    };
    editProduct(reqData);
  };

  const handleClickDeleteTag = (index) => {
    setTags((prevTags) => [
      ...prevTags.slice(0, index),
      ...prevTags.slice(index + 1),
    ]);
  };

  const handleChangeImages = (e) => {
    if (!e.target.files) rerturn;
    const fileList = e.target.files;
    const fileArray = Array.from(fileList); // iterable을 array로 변경(map method를 쓰기 위해)

    if (fileArray.length > 3)
      return modal.open(
        <AlertModal alertMessage="이미지는 최대 3개까지 등록 가능합니다." />
      );
    setPickedImages(fileArray);
    const pickedImgUrls = fileArray.map((file) => URL.createObjectURL(file));
    setImgUrls(pickedImgUrls);
    e.target.value = '';
  };

  const handleClickAddImageButton = () => {
    fileInputRef.current.click();
  };

  const handleClickDeleteImageButton = (idx) => {
    if (imgUrls.length > 1) {
      setImgUrls(imgUrls.filter((_, index) => index !== idx));
    } else {
      setImgUrls([]);
    }
  };

  const handleTagEnter = (e) => {
    if (
      e.target.value && // 빈값이 아니고
      e.key === 'Enter' &&
      e.nativeEvent.isComposing === false // 한글 입력 시의 문제를 해결하기 위해 추가
    ) {
      e.preventDefault();
      const isTagValid = e.target.value.length <= 5;
      if (!isTagValid) {
        return setError('tag', { message: '5글자 이내로 입력해주세요' });
      }
      setTags((prevTags) => [...prevTags, e.target.value]); // 태그에 추가

      /**
       * 입력된 tag 초기화
       * - 그냥 쓰면 태그에 추가되기 전에 초기화가 되어 버려 딜레이 추가, 근데 왜!?!(2025.01.28)
       */
      setTimeout(() => setValue('tag', ''), 50);
    }
  };

  // useEffect(() => {
  //   // /products/post로 접근 시 로그인 여부 체크
  //   checkIsLoggedIn();
  // }, [isLoggedIn]);
  console.log(imgUrls > 0);

  return (
    <PageContainer>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="flex justify-between items-center mb-6">
            <p className="text-xl font-semibold">상품 수정하기</p>
            <Button
              type="button"
              onClick={handleClickRegister}
              disabled={!isPossibleRegist || isPending}
            >
              {isPending ? <Loader /> : '등록'}
            </Button>
          </div>
          <div className="inline-flex flex-col w-full mb-6">
            <label htmlFor="images" className="text-lg font-bold mb-4">
              상품 이미지
            </label>
            <div className="grid gap-6 grid-cols-4 mb-8">
              <button
                onClick={handleClickAddImageButton}
                type="button"
                className="flex items-center justify-center w-[100%] pb-[calc(50%-43px)] pt-[calc(50%-43px)] bg-[#F3F4F6] rounded-xl"
              >
                <div className="flex flex-col justify-center items-center">
                  <Image src={icPlus} alt="이미지등록" className="w-12 mb-3" />
                  <p className="text-[#9CA3AF]">이미지 등록(최대 3)</p>
                </div>
              </button>
              <input
                id="images"
                type="file"
                {...register('images', {})}
                accept="image/*"
                multiple
                className="hidden"
                ref={fileInputRef}
                onChange={handleChangeImages}
              />

              {imgUrls !== null && imgUrls.length !== 0 ? (
                imgUrls.map((imgUrl, index) => (
                  <div className="relative" key={imgUrl + index}>
                    <Image
                      src={imgUrl}
                      alt="첨부이미지"
                      fill
                      className="rounded-xl aspect-square object-cover"
                    />
                    <div className="flex justify-center items-center absolute right-3 top-3 w-5 h-5 rounded-full bg-[#9CA3AF] cursor-pointer">
                      <Image
                        src={icX}
                        alt="첨부이미지 삭제"
                        className="w-[10px]"
                        onClick={() => handleClickDeleteImageButton(index)}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div></div>
              )}
            </div>
            <label htmlFor="name" className="text-lg font-bold mb-4">
              상품명
            </label>
            <input
              className={`outline-[#3692ff] w-full px-6 h-14  bg-[#f3f4f6] placeholder-gray-400  text-black rounded-lg focus:ring-2 ring-white ring-offset-2 fing-offset-gray-500 transition-all 
                }`}
              type="text"
              id="name"
              placeholder="상품명을 입력해주세요"
              {...register('name', {
                required: '상품명을 입력해주세요',
                minLength: { value: 2, message: '2글자 이상 입력해주세요' },
                maxLength: { value: 20, message: '20글자 이내로 입력해주세요' },
              })}
            />
            {!isValid && (
              <span className="ml-4 mt-2 text-[15px] font-semibold text-[#F74747]">
                {errors.name?.message}
              </span>
            )}
          </div>
          <div className="inline-flex flex-col w-full mb-6">
            <label htmlFor="description" className="text-lg font-bold mb-4">
              상품 소개
            </label>
            <textarea
              className={`outline-[#3692ff] w-full px-6 py-4 h-[282px] bg-[#f3f4f6] placeholder-gray-400  text-black rounded-lg focus:ring-2 ring-white ring-offset-2 fing-offset-gray-500 transition-all 
                }`}
              type="text"
              id="description"
              placeholder="상품 소개를 입력해주세요"
              {...register('description', {
                required: '상품 소개를 입력해주세요',
                minLength: { value: 10, message: '10글자 이상 입력해주세요' },
                maxLength: {
                  value: 500,
                  message: '500글자 이내로 입력해주세요',
                },
              })}
            />
            {!isValid && (
              <span className="ml-4 mt-2 text-[15px] font-semibold text-[#F74747]">
                {errors.description?.message}
              </span>
            )}
          </div>
          <div className="inline-flex flex-col w-full mb-6">
            <label htmlFor="price" className="text-lg font-bold mb-4">
              판매 가격
            </label>
            <input
              className={`outline-[#3692ff] w-full px-6 h-14  bg-[#f3f4f6] placeholder-gray-400  text-black rounded-lg focus:ring-2 ring-white ring-offset-2 fing-offset-gray-500 transition-all 
                }`}
              type="text"
              id="price"
              placeholder="판매 가격을 입력해주세요"
              {...register('price', {
                required: '판매 가격을 입력해주세요',
                validate: {
                  isNumber: (value) => {
                    return Number.isInteger(Number(value))
                      ? true
                      : '숫자만 입력해주세요';
                  },
                },
              })}
            />
            {!isValid && (
              <span className="ml-4 mt-2 text-[15px] font-semibold text-[#F74747]">
                {errors.price?.message}
              </span>
            )}
          </div>
          <div className="inline-flex flex-col w-full mb-6">
            <label htmlFor="tag" className="text-lg font-bold mb-4">
              태그
            </label>
            <input
              className={`outline-[#3692ff] w-full px-6 h-14  bg-[#f3f4f6] placeholder-gray-400  text-black rounded-lg focus:ring-2 ring-white ring-offset-2 fing-offset-gray-500 transition-all 
                }`}
              type="text"
              id="tag"
              placeholder="태그를 입력하고 엔터키를 눌러주세요." // 추가 버튼이 없으므로 엔터키 입력에 대한 내용도 추가
              onKeyDown={handleTagEnter}
              {...register('tag', {
                maxLength: { value: 5, message: '5글자 이내로 입력해주세요' },
              })}
            />
            {!isValid && (
              <span className="ml-4 mt-2 text-[15px] font-semibold text-[#F74747]">
                {errors.tag?.message}
              </span>
            )}
            {/* 현재로서는 태그가 0개인 경우 form에러 체크는 어려우므로 별도 체크 */}
            {/* useFieldArray로 가능한지 체크해볼 것  */}
            {!isTagsNotEmpty && (
              <span className="ml-4 mt-2 text-[15px] font-semibold text-[#F74747]">
                최소 1개 이상의 태그가 필요합니다
              </span>
            )}
            <div className="flex flex-wrap mt-4">
              {tags.map((tag, index) => (
                <TagChip
                  key={tag + index}
                  tag={tag}
                  index={index}
                  onClick={handleClickDeleteTag}
                />
              ))}
            </div>
          </div>
        </form>
      </div>
    </PageContainer>
  );
}

export default ProductEditPage;
