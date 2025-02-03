import React from "react";
import Google from "@/assets/svg/ic_google.svg";
import Kakao from "@/assets/svg/ic_kakao.svg";
import Image from "next/image";

function SocialLogin() {
  return (
    <div className="w-full h-[74px] px-[23px] py-4 flex justify-between items-center rounded-lg bg-[#E6F2FF]">
      <p className="font-medium"> 간편 로그인하기</p>
      <div className="flex gap-4">
        <a href="https://www.google.com">
          <Image src={Google.src} alt="googleicon" width={42} height={42} />
        </a>
        <a href="https://www.kakaocorp.com/page/">
          <Image src={Kakao.src} alt="kakaoicon" width={42} height={42} />
        </a>
      </div>
    </div>
  );
}

export default SocialLogin;
