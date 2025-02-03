"use client";
import React, { useState } from "react";
import kebab from "@/assets/svg/ic_kebab.svg";
import Image from "next/image";
import clsx from "clsx";

function DropdownMenuButton(props) {
  const [isDropdown, setIsDropdown] = useState(false);
  const handleButtonClick = () => {
    setIsDropdown(!isDropdown);
  };
  return (
    <div className="relative">
      <button onClick={handleButtonClick}>
        <Image src={kebab.src} width={24} height={24} alt="kebabicon" />
      </button>
      <div className="absolute right-0">
        {isDropdown &&
          props.menus.map((menu, index) => (
            <button
              key={menu.label}
              onClick={() => {
                menu.onClick();
                setIsDropdown(false);
              }}
              className={clsx(
                "text-[#6B7280] h-[46px] w-[139px] border-x border-[#D1D5DB] bg-white flex justify-center items-center",
                index === 0
                  ? "rounded-t-lg border-t pt-4 pb-3"
                  : "rounded-b-lg border-b pt-3 pb-4"
              )}
            >
              {menu.label}
            </button>
          ))}
      </div>
    </div>
  );
}

export default DropdownMenuButton;
