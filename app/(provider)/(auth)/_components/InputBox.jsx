"use client";
import clsx from "clsx";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import visibilityOnIcon from "@/assets/svg/btn_visibility_on.svg";
import visibilityOffIcon from "@/assets/svg/btn_visibility_off.svg";

function InputBox({ userData, name, placeholder, title, errorMsg, ...props }) {
  const isPassword = name === "password" || name === "passwordConfirmation";

  const [passwordVisible, setPasswordVisible] = useState(!isPassword);

  const handleTypeChange = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col md:gap-4 gap-2">
        <p className="font-bold md:text-[18px] text-[14px]">{title}</p>
        <div className="relative">
          <input
            name={name}
            className={clsx(
              "md:w-[640px] md:h-p[56px] rounded-xl px-6 py-4 bg-[#F3F4F6] w-[343px] h-14 focus:outline-blue",
              { "outline outline-1 outline-red ": errorMsg !== "" }
            )}
            placeholder={placeholder}
            value={userData}
            type={passwordVisible === false ? "password" : "text"}
            {...props}
          />
          {isPassword &&
            (passwordVisible ? (
              <Image
                src={visibilityOnIcon}
                alt="visibilityonicon"
                onClick={handleTypeChange}
                className="absolute top-1/2 right-6 -translate-y-1/2"
              />
            ) : (
              <Image
                src={visibilityOffIcon}
                alt="visibilityofficon"
                onClick={handleTypeChange}
                className="absolute top-1/2 right-6 -translate-y-1/2"
              />
            ))}
        </div>
      </div>
      {errorMsg && <div className="text-red pl-4">{errorMsg}</div>}
    </div>
  );
}

export default InputBox;
