import Link from "next/link";
import React from "react";
import Image from "next/image";
import Logo from "@/assets/img/logo.png";
import Button from "@/components/Button";

function Header() {
  return (
    <header className="h-20 px-36 flex items-center justify-between border-b-2">
      {/* 로고 */}
      <Link href="/">
        <Image alt="logo" src={Logo} className="w-[140px] h-auto" />
      </Link>
      <ol className="flex flex-1 px-10 justify-start gap-x-10 font-medium">
        <Link href="/board">
          <li>자유게시판</li>
        </Link>
        <Link href="/market">
          <li>중고마켓</li>
        </Link>
      </ol>

      {/* 로그인 버트 */}
      <div>
        <Button>로그인</Button>
      </div>
    </header>
  );
}

export default Header;
