import React from "react";
import Image from "next/image";
import panda from "@/assets/svg/img_home_bottom.svg";

function BottomBanner() {
  return (
    <div className="bg-[#CFE5FF] xl:h-[540px] md:h-[927px] h-[540px] box-border flex justify-center items-end relative translate-y-[160px]">
      <div className="flex xl:flex-row flex-col gap-[7px] items-center">
        <div className="flex flex-col gap-[40px] md:mb-40 xl:mb-0 items-center">
          <h1 className="font-bold flex flex-col xl:flex-col md:flex-row md:text-[40px] pb-15 text-[32px] md:self-start self-center max-md:text-center">
            <p>일상의 모든 물건을 &nbsp; </p>
            <p>거래해 보세요</p>
          </h1>
        </div>
        <Image src={panda} alt="pandaImage" />
      </div>
    </div>
  );
}

export default BottomBanner;
