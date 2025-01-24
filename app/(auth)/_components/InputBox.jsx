import clsx from "clsx";
import React from "react";

function InputBox({ userData, handleChange, name, placeholder, title }) {
  return (
    <div className="flex flex-col md:gap-4 gap-2">
      <p className="font-bold md:text-[18px] text-[14px]">{title}</p>
      <input
        name={name}
        className={clsx(
          "md:w-[640px] md:h-p[56px] rounded-xl px-6 py-4 bg-[#F3F4F6] w-[343px] h-14 focus:outline-blue"
        )}
        placeholder={placeholder}
        value={userData[name] || ""}
        onChange={handleChange}
        type={
          name === "password" || name === "passwordCheck" ? "password" : "text"
        }
      />
    </div>
  );
}

export default InputBox;
