import React from "react";
import Header from "./_components/Header";
import { basicFont } from "@/assets/fonts";
import Footer from "./_components/Footer";
function Rootlayout({ children }) {
  return (
    <div>
      <div
        className={`min-h-screen pb-[160px]${basicFont.className} text-[#1F2937]`}
      >
        <Header />
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default Rootlayout;
