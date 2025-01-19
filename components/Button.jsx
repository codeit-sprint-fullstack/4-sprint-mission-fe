import React from "react";
import clsx from "clsx";

function Button({
  children,
  size = "md",
  intent = "primary",
  className,
  disabled,
  ...props
}) {
  const defaultClassNames = clsx(
    "hover:brightness-90 active:brightness-75 tarnsition text-white"
  );

  const sizeClassNames = clsx({
    "px-5 py-2 text-[16px] font-bold rounded-lg": size === "md",
  });

  const intentClassNames = clsx({
    "bg-blue-500": intent === "primary",
  });

  return (
    <button
      className={clsx(defaultClassNames, sizeClassNames, intentClassNames)}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
