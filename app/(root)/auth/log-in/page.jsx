'use client';

import PageContainer from '@/components/common/Page';
import logo from '@/assets/images/logo.png';
import Image from 'next/image';
import Input from '@/components/common/Input';
import React, { useState } from 'react';
import AuthFooter from '@/components/auth/AuthFooter';
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import dynamic from 'next/dynamic';

// 문제해결: 그냥 react-hook-form의 DevTool을 import해서 사용하면 hydration 오류가 발생
const DevT = dynamic(
  () => import('@hookform/devtools').then((module) => module.DevTool),
  { ssr: false }
);

function LogInPage() {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const handleBlurEmail = () => {
    console.log('Email Blur!!');
  };
  const { register, control } = useForm();

  const handleClickToggleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };
  return (
    <PageContainer>
      <div className="flex justify-center">
        <div className="flex flex-col items-center w-[640px]">
          <Image src={logo} alt="logo" className="w-[396px] mt-10 mb-10" />
          <form className="w-full">
            <div className="inline-flex flex-col w-full mb-6">
              <label htmlFor="email" className="text-lg font-bold mb-4">
                이메일
              </label>
              <input
                className={`outline-[#3692ff] w-full px-6 py-2 h-14  bg-[#f3f4f6] placeholder-gray-400  text-black rounded-lg focus:ring-2 ring-white ring-offset-2 fing-offset-gray-500 transition-all 
                }`}
                type="email"
                id="email"
                {...register('email')}
                // className={`outline-[#3692ff] w-full px-6 py-2 h-14  bg-[#f3f4f6] placeholder-gray-400  text-black rounded-lg focus:ring-2 ring-white ring-offset-2 fing-offset-gray-500 transition-all ${
                //   errorText ? 'outline-[#F74747]' : ''
                // }`}
              />
            </div>
            <div className="inline-flex flex-col w-full mb-6">
              <label htmlFor="email" className="text-lg font-bold mb-4">
                비밀번호
              </label>
              <input
                className={`outline-[#3692ff] w-full px-6 py-2 h-14  bg-[#f3f4f6] placeholder-gray-400  text-black rounded-lg focus:ring-2 ring-white ring-offset-2 fing-offset-gray-500 transition-all 
                }`}
                type="password"
                id="password"
                {...register('password')}
              />
            </div>
            {/* <Input
              control={control}
              label="이메일"
              name="email"
              type="email"
              placeholder="이메일을 입력해주세요"
              onBlur={handleBlurEmail}
              onChange={handleBlurEmail}
            />
            <Input
              control={control}
              label="비밀번호"
              name="password"
              type="password"
              placeholder="비밀번호를 입력해주세요"
              errorText="에러가 있음"
              isPassword={true}
              isShowPassword={isShowPassword}
              onClick={handleClickToggleShowPassword}
            /> */}
            <div className="flex justify-center">
              <button className="min-w-full h-14 px-6 py-2 bg-[#3692FF] text-white rounded-full hover:bg-[#1469CF] flex items-center justify-center">
                <p className="mr-2 text-center">로그인</p>
              </button>
            </div>
          </form>
          <AuthFooter isLogin={true} />
        </div>
        <DevT control={control} />
      </div>
    </PageContainer>
  );
}

export default LogInPage;
