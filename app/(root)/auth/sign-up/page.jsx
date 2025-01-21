'use client';

import PageContainer from '@/components/common/Page';
import logo from '@/assets/images/logo.png';
import Image from 'next/image';
import Input from '@/components/common/Input';
import { useState } from 'react';
import AuthFooter from '@/components/auth/AuthFooter';

function SignUpPage() {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowPasswordConfirm, setIsShowPasswordConfirm] = useState(false);

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
          <form className="w-full">
            <Input
              label="이메일"
              name="email"
              type="email"
              placeholder="이메일을 입력해주세요"
            />
            <Input
              label="닉네임"
              name="nickname"
              type="text"
              placeholder="닉네임을 입력해주세요"
            />
            <Input
              label="비밀번호"
              name="password"
              type="password"
              placeholder="비밀번호를 입력해주세요"
              errorText="에러가 있음"
              isPassword={true}
              isShowPassword={isShowPassword}
              onClick={handleClickToggleShowPassword}
            />
            <Input
              label="비밀번호 확인"
              name="passwordConfirm"
              type="password"
              placeholder="비밀번호를 다시 한 번 입력해주세요"
              errorText="에러가 있음"
              isPassword={true}
              isShowPassword={isShowPasswordConfirm}
              onClick={handleClickToggleShowPasswordConfirm}
            />
            <div className="flex justify-center">
              <button className="min-w-full h-14 px-6 py-2 bg-[#3692FF] text-white rounded-full hover:bg-[#1469CF] flex items-center justify-center">
                <p className="mr-2 text-center">회원가입</p>
              </button>
            </div>
          </form>
          <AuthFooter />
        </div>
      </div>
    </PageContainer>
  );
}

export default SignUpPage;
