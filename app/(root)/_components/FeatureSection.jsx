import React from "react";
import Image from "next/image";
import clsx from "clsx";

function FeatureSection({
  imgSrc,
  topText,
  midText1,
  midText2,
  botText1,
  botText2,
  reverse = false,
}) {
  return (
    <div className="flex justify-center items-center w-full xl:px-[344px] xl:py-[138px] ">
      <div
        className={clsx(
          "flex  flex-col xl:gap-16 gap-6  bg-[#fcfcfc]",
          reverse ? "xl:flex-row-reverse" : "xl:flex-row"
        )}
      >
        <div className="relative xl:w-[588px] xl:h-[444px] md:w-[696px] md:h-[524px] w-[344px] h-[259px]">
          <Image src={imgSrc} alt="homeimage1" fill />
        </div>

        <div
          className={clsx(
            "flex flex-col xl:gap-3 md:gap-6 gap-[16px] justify-center  ",
            reverse ? "text-right " : "text-left"
          )}
        >
          <p className="font-bold text-[#3692FF] md:text-[18px] text-[16px]">
            {topText}
          </p>

          <span
            className={clsx(
              "flex xl:flex-col flex-row font-bold xl:text-[40px] md:text-[32px] text-[24px]",
              reverse && "justify-end"
            )}
          >
            <p>{midText1}</p>
            <span className={clsx(reverse && "ml-2", "xl:ml-0")}>
              <p>{midText2}</p>
            </span>
          </span>

          <span className="flex flex-col font-medium xl:text-[24px] md:text-[18px] text-[16px]">
            <p>{botText1}</p>
            <p>{botText2}</p>
          </span>
        </div>
      </div>
    </div>
  );
}

export default FeatureSection;
