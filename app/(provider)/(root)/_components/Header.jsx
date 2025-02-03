import React from "react";
import Image from "next/image";
import Logo from "@/assets/svg/pandaLogo.svg";
import Button from "@/components/Button";
import Link from "next/link";
import HeaderMenu from "./HeaderMenu";
import LogInButton from "./LogInButton";

function Header() {
  return (
    <header className=" flex justify-center w-full min-w-max h-[70px] xl:px-[200px] px-[30px] border-b border-[#DFDFDF] sticky box-border top-0 z-10 bg-white">
      <div className="flex justify-between items-center w-full ">
        <div className="flex items-center text-nowrap">
          <Link className="mr-4 " href="/">
            <Image src={Logo.src} width={153} height={51} alt="logo" />
          </Link>
          <HeaderMenu />
        </div>
        <LogInButton />
      </div>
    </header>
  );
}

export default Header;
