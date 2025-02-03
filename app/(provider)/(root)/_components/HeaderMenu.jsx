"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function HeaderMenu() {
  const pathName = usePathname();
  const showMenu = pathName === "/" ? false : true;
  return (
    <div>
      {showMenu && (
        <>
          <Link
            className={`px-[15px] py-[21px] text-[18px] ${
              pathName === "/articles" ? "text-blue" : "text-[#4B5563]"
            } font-bold`}
            href="/articles"
          >
            자유게시판
          </Link>
          <Link
            className={`px-[15px] py-[21px] text-[18px] ${
              pathName === "/products" ? "text-blue" : "text-[#4B5563]"
            } font-bold`}
            href="/products"
          >
            중고마켓
          </Link>
        </>
      )}
    </div>
  );
}

export default HeaderMenu;
