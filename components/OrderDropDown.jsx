"use client";
import clsx from "clsx";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import React from "react";

function OrderDropDown({ children, className, ...props }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const defaultclass = clsx(
    "border border-[#e5e7eb] rounded-xl text-base text-center leading-none"
  );

  const handleSelectChange = (e) => {
    const params = new URLSearchParams(searchParams);
    params.set("order", e.target.value);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <select
      className={clsx(className, defaultclass)}
      onChange={handleSelectChange}
      {...props}
    >
      {children}
    </select>
  );
}

export default OrderDropDown;
