import React from "react";
import { basicFont } from "@/assets/fonts";

function layout({ children }) {
  return (
    <div
      className={`min-w-max min-h-screen ${basicFont.className} text-[#1F2937] flex items-center`}
    >
      {children}
    </div>
  );
}

export default layout;
