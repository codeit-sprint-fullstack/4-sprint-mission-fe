import React from "react";
import Header from "./_components/Header";
import { basicFont } from "@/assets/fonts";
import Footer from "./_components/Footer";

function Rootlayout({ children }) {
  return (
    <div className={`min-w-max  ${basicFont.className} text-[#1F2937] `}>
      <div className="min-h-screen">
        <Header />
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default Rootlayout;
