import clsx from "clsx";
import React from "react";

function Button({ children, isActive = "active", className, ...props }) {
  const buttonColor = clsx({
    "bg-blue text-white": isActive === "active",
    "bg-[#9CA3AF] text-white": isActive === "inactive",
  });

  return (
    <button
      className={clsx(
        "flex items-center justify-center whitespace-nowrap",
        className,
        buttonColor
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
