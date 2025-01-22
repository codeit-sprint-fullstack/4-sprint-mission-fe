'use client';

import eyeDisable from '@/assets/images/eye-disable.png';
import eye from '@/assets/images/eye.png';
import logo from '@/assets/images/logo.png';
import AuthFooter from '@/components/auth/AuthFooter';
import PageContainer from '@/components/common/Page';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

// TODO 문제해결: 그냥 react-hook-form의 DevTool을 import해서 <DevTools /> 컴포넌트를 사용하면
// hydration 오류가 발생, 아래의 코드를 적용해야 함
const DevT = dynamic(
  () => import('@hookform/devtools').then((module) => module.DevTool),
  { ssr: false }
);
function SignUpPage() {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowPasswordConfirm, setIsShowPasswordConfirm] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    getValues,
    formState: { errors, isValid, isDirty },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      email: '',
      nickname: '',
      password: '',
      passwordConfirm: '',
    },
  }); // mode: onBlur, onChange, onSubmit(default)

  // const {errors}=formState; // 풀어서 쓰려면 이렇게 formState에서 꺼내서 사용

  const onSubmit = (data) => {
    console.log('Form submitted.', data);
  };

  const handleClickToggleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };
  const handleClickToggleShowPasswordConfirm = () => {
    setIsShowPasswordConfirm(!isShowPasswordConfirm);
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
                htmlFor="passwordConfirm"
                className="text-lg font-bold mb-4"
              >
                비밀번호 확인
              </label>
              <div className="relative">
                <input
                  className={`outline-[#3692ff] w-full px-6 py-2 h-14  bg-[#f3f4f6] placeholder-gray-400  text-black rounded-lg focus:ring-2 ring-white ring-offset-2 fing-offset-gray-500 transition-all 
                }`}
                  type={!isShowPasswordConfirm ? 'password' : 'text'}
                  id="passwordConfirm"
                  {...register('passwordConfirm', {
                    required: '비밀번호를 다시 한 번 입력해주세요',
                    validate: {
                      isNotMatch: () => {
                        const {
                          password: passwordValue,
                          passwordConfirm: passwordConfirmValue,
                        } = getValues();
                        return (
                          passwordValue === passwordConfirmValue ||
                          '비밀번호가 일치하지 않습니다'
                        );
                      },
                    },
                  })}
                />
                <Image
                  src={isShowPasswordConfirm ? eye : eyeDisable}
                  alt="toggle-show-password"
                  className="w-6 absolute bottom-4 right-6 cursor-pointer"
                  onClick={handleClickToggleShowPasswordConfirm}
                />
              </div>
              {!isValid && (
                <span className="ml-4 mt-2 text-[15px] font-semibold text-[#F74747]">
                  {errors.passwordConfirm?.message}
                </span>
              )}
            </div>
            <div className="flex justify-center">
              <button
                className={`min-w-full h-14 px-6 py-2 ${
                  !isValid ? 'bg-[#9CA3AF]' : 'bg-[#3692FF]'
                } text-white rounded-full ${
                  !isValid ? '' : 'hover:bg-[#1469CF] active:brightness-75'
                }  flex items-center justify-center`}
                disabled={!isDirty || !isValid}
              >
                <p className="mr-2 text-center">회원가입</p>
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
