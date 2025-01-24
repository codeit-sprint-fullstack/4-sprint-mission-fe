"use client";
import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import Image from "next/image";
import search from "@/assets/svg/ic_search.svg";
import clsx from "clsx";

function SearchBar({ children, className, ...props }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((e) => {
    const params = new URLSearchParams(searchParams);
    if (e.target.value) {
      params.set("keyword", e.target.value);
    } else {
      params.delete("keyword");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="relative felx items-center">
      <Image
        className="absolute left-3 top-1/2 -translate-y-1/2"
        src={search.src}
        width={24}
        height={24}
        alt="searchIcon"
      />
      <input
        className={clsx(className, "pl-9")}
        name="content"
        placeholder={children}
        onChange={handleSearch}
        defaultValue={searchParams.get("keyword")?.toString()}
        {...props}
      />
    </div>
  );
}

export default SearchBar;
