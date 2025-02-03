import clsx from "clsx";
import React from "react";

function Button({ children, type = "active", className, ...props }) {
  const buttonActive = clsx({
    "bg-blue text-white": type === "active",
    "bg-[#9CA3AF] text-white": type === "inactive",
    "border-2 border-[#F74747] bg-white text-[#F74747] font-semibold ":
      type === "redBorder",
    "bg-[#F74747] text-white font-semibold": type === "redButton",
  });

  return (
    <button
      className={clsx(
        "flex items-center justify-center whitespace-nowrap ",
        className,
        buttonActive
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
