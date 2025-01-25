'use client';

import api from '@/api';
import eyeDisable from '@/assets/images/eye-disable.png';
import eye from '@/assets/images/eye.png';
import logo from '@/assets/images/logo.png';
import AuthFooter from '@/components/auth/AuthFooter';
import AlertModal from '@/components/common/AlertModal';
import Loader from '@/components/common/Loader';
import PageContainer from '@/components/common/Page';
import { useAuth } from '@/contexts/AuthContext';
import { useModal } from '@/contexts/ModalContext';
import { useMutation } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

// TODO 문제해결: 그냥 react-hook-form의 DevTool을 import해서 <DevTools /> 컴포넌트를 사용하면
// hydration 오류가 발생, 아래의 코드를 적용해야 함
const DevT = dynamic(
  () => import('@hookform/devtools').then((module) => module.DevTool),
  { ssr: false }
);
function SignUpPage() {
  const { logIn } = useAuth();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowPasswordConfirmation, setIsShowPasswordConfirmation] =
    useState(false);
  const router = useRouter();
  const modal = useModal();

  const {
    register,
    control,
    handleSubmit,
    getValues,
    setError,
    formState: { errors, isValid, isDirty },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      email: '',
      nickname: '',
      password: '',
      passwordConfirmation: '',
    },
  }); // mode: onBlur, onChange, onSubmit(default)

  const handleClickConfirm = () => {
    router.push('/products');
    logIn();
    modal.close();
  };

  const { mutate: signUp, isPending } = useMutation({
    mutationFn: (userData) => api.signUp(userData),
    onSuccess: () => {
      modal.open(
        <AlertModal
          errorMessage={'가입 완료되었습니다.'}
          onClick={handleClickConfirm}
        />
      );
    },
    onError: (error) => {
      if (error.response.data.message === '이미 사용중인 이메일입니다.') {
        modal.open(<AlertModal errorMessage={'이미 사용중인 이메일입니다.'} />);
        setError('email', { message: '이메일을 확인해 주세요' });
      } else if (
        error.response.data.message === '이미 사용중인 닉네임입니다.'
      ) {
        modal.open(<AlertModal errorMessage={'이미 사용중인 닉네임입니다.'} />);
        setError('nickname', { message: '닉네임을 확인해 주세요' });
      }
    },
  });

  const onSubmit = (inputData) => {
    signUp(inputData);
  };

  const handleClickToggleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };
  const handleClickToggleShowPasswordConfirm = () => {
    setIsShowPasswordConfirmation(!isShowPasswordConfirmation);
  };
  return (
    <PageContainer>
      <div className="flex justify-center">
        <div className="flex flex-col items-center w-[640px]">
          <Image src={logo} alt="logo" className="w-[396px] mt-10 mb-10" />
          {/* noValidate: HTML에서 기본적으로 하는 유효성 검증 OFF */}
          <form className="w-full" onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="inline-flex flex-col w-full mb-6">
              <label htmlFor="email" className="text-lg font-bold mb-4">
                이메일
              </label>
              <input
                className={`outline-[#3692ff] w-full px-6 py-2 h-14  bg-[#f3f4f6] placeholder-gray-400  text-black rounded-lg focus:ring-2 ring-white ring-offset-2 fing-offset-gray-500 transition-all 
                }`}
                type="email"
                id="email"
                {...register('email', {
                  required: '이메일을 입력해주세요',
                  pattern: {
                    value:
                      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    message: '잘못된 이메일 형식입니다',
                  },
                })}
              />
              {!isValid && (
                <span className="ml-4 mt-2 text-[15px] font-semibold text-[#F74747]">
                  {errors.email?.message}
                </span>
              )}
            </div>
            <div className="inline-flex flex-col w-full mb-6">
              <label htmlFor="nickname" className="text-lg font-bold mb-4">
                닉네임
              </label>
              <input
                className={`outline-[#3692ff] w-full px-6 py-2 h-14  bg-[#f3f4f6] placeholder-gray-400  text-black rounded-lg focus:ring-2 ring-white ring-offset-2 fing-offset-gray-500 transition-all 
                }`}
                type="text"
                id="nickname"
                {...register('nickname', {
                  required: '닉네임을 입력해주세요',
                  minLength: {
                    value: 2,
                    message: '닉네임을 2글자 이상 입력해주세요',
                  },
                })}
              />
              {!isValid && (
                <span className="ml-4 mt-2 text-[15px] font-semibold text-[#F74747]">
                  {errors.nickname?.message}
                </span>
              )}
            </div>
            <div className="inline-flex flex-col w-full mb-6">
              <label htmlFor="password" className="text-lg font-bold mb-4">
                비밀번호
              </label>
              <div className="relative">
                <input
                  className={`outline-[#3692ff] w-full px-6 py-2 h-14  bg-[#f3f4f6] placeholder-gray-400  text-black rounded-lg focus:ring-2 ring-white ring-offset-2 fing-offset-gray-500 transition-all 
                }`}
                  type={!isShowPassword ? 'password' : 'text'}
                  id="password"
                  {...register('password', {
                    required: '비밀번호를 입력해주세요',
                    minLength: {
                      value: 8,
                      message: '비밀번호를 8자 이상 입력해주세요',
                    },
                  })}
                />
                <Image
                  src={isShowPassword ? eye : eyeDisable}
                  alt="toggle-show-password"
                  className="w-6 absolute bottom-4 right-6 cursor-pointer"
                  onClick={handleClickToggleShowPassword}
                />
              </div>
              {!isValid && (
                <span className="ml-4 mt-2 text-[15px] font-semibold text-[#F74747]">
                  {errors.password?.message}
                </span>
              )}
            </div>
            <div className="inline-flex flex-col w-full mb-6">
              <label
                htmlFor="passwordConfirmation"
                className="text-lg font-bold mb-4"
              >
                비밀번호 확인
              </label>
              <div className="relative">
                <input
                  className={`outline-[#3692ff] w-full px-6 py-2 h-14  bg-[#f3f4f6] placeholder-gray-400  text-black rounded-lg focus:ring-2 ring-white ring-offset-2 fing-offset-gray-500 transition-all 
                }`}
                  type={!isShowPasswordConfirmation ? 'password' : 'text'}
                  id="passwordConfirmation"
                  {...register('passwordConfirmation', {
                    required: '비밀번호를 다시 한 번 입력해주세요',
                    validate: {
                      isPasswordNotMatch: () => {
                        const {
                          password: passwordValue,
                          passwordConfirmation: passwordConfirmationValue,
                        } = getValues();
                        return (
                          passwordValue === passwordConfirmationValue ||
                          '비밀번호가 일치하지 않습니다'
                        );
                      },
                    },
                  })}
                />
                <Image
                  src={isShowPasswordConfirmation ? eye : eyeDisable}
                  alt="toggle-show-password"
                  className="w-6 absolute bottom-4 right-6 cursor-pointer"
                  onClick={handleClickToggleShowPasswordConfirm}
                />
              </div>
              {!isValid && (
                <span className="ml-4 mt-2 text-[15px] font-semibold text-[#F74747]">
                  {errors.passwordConfirmation?.message}
                </span>
              )}
            </div>
            <div className="flex justify-center">
              <button
                className={`min-w-full h-14 px-6 py-2 ${
                  !isValid || isPending ? 'bg-[#9CA3AF]' : 'bg-[#3692FF]'
                } text-white rounded-full ${
                  !isValid || isPending
                    ? ''
                    : 'hover:bg-[#1469CF] active:brightness-75'
                }  flex items-center justify-center`}
                disabled={!isDirty || !isValid}
              >
                <p className="mr-2 text-center">
                  {isPending ? <Loader /> : '회원가입'}
                </p>
              </button>
            </div>
          </form>
          <AuthFooter />
        </div>
        <DevT control={control} />
      </div>
    </PageContainer>
  );
}

export default SignUpPage;
