import Link from 'next/link';
import logo from '@/assets/images/logo.png';
import logoM from '@/assets/images/logo-m.png';
import HeaderNav from './HeaderNav';
import Image from 'next/image';
import Button from './Button';
import React from 'react';

function Header({ isLandingPage = false }) {
  console.log('header is rendered');
  return (
    <header className="bg-white sticky z-10 top-0 flex justify-center border-b border-slate-200">
      <div className="w-full h-[70px] max-w-[1520px] flex justify-between items-center mx-[200px] md:mx-6 sm:mx-4">
        <div className="flex items-center shrink-0">
          <Link href="/">
            {/* <Image src={logoM} id="logoM" alt="판다마켓 로고" /> */}
            <Image
              src={logo}
              id="logo"
              alt="판다마켓 로고"
              width={153}
              className="shrink-0 align-bottom"
              priority
            />
          </Link>
        </div>
        <div className="grow-1 max-w-full w-full flex justify-start">
          {/* 랜딩 페이지인 경우에만 nav메뉴 렌더링 */}
          {isLandingPage || <HeaderNav />}
        </div>
        <Link className="shrink-0" href="/auth/log-in">
          <Button>로그인</Button>
        </Link>
      </div>
    </header>
  );
}

export default Header;
