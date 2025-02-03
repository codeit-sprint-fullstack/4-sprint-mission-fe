import FeatureSection from "./_components/FeatureSection";
import MainBanner from "./_components/MainBanner";
import home1 from "@/assets/svg/img_home_01.svg";
import home2 from "@/assets/svg/img_home_02.svg";
import home3 from "@/assets/svg/img_home_03.svg";
import BottomBanner from "./_components/BottomBanner";
export default function Home() {
  return (
    <div>
      <MainBanner />
      <div className="flex flex-col xl:gap-0 md:gap-[52px] gap-10 xl:mt-0 md:mt-5 mt-12">
        <FeatureSection
          imgSrc={home1.src}
          topText="Hot item"
          midText1="인기 상품을 &nbsp;"
          midText2="확인해 보세요"
          botText1="가장 HOT한 중고거래 물품을 &nbsp;"
          botText2="판다 마켓에서 확인해 보세요"
        />
        <FeatureSection
          imgSrc={home2.src}
          topText="Search"
          midText1="구매를 원하는 "
          midText2="상품을 검색하세요"
          botText1="구매하고 싶은 물품은 검색해서 "
          botText2="쉽게 찾아보세요"
          reverse={true}
        />
        <FeatureSection
          imgSrc={home3.src}
          topText="Register"
          midText1="판매를 원하는 &nbsp;"
          midText2="상품을 등록하세요"
          botText1="어떤 물건이든 판매하고 싶은 상품을 &nbsp;"
          botText2="쉽게 등록하세요"
        />
      </div>
      <BottomBanner />
    </div>
  );
}
