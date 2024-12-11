import home1 from "../img/Img_home_01.svg";
import home2 from "../img/Img_home_02.svg";
import home3 from "../img/Img_home_03.svg";
import "./MainSection.css";

export const MainSection = () => {
  const sections = [
    {
      img: home1,
      top: "Hot item",
      mid1: "인기 상품을",
      mid2: "확인해 보세요",
      bottom1: "가장 HOT 한 중고거래 물품을",
      bottom2: "판다 마켓에서 확인해 보세요",
    },
    {
      img: home2,
      top: "Search",
      mid1: "구매를 원하는",
      mid2: "상품을 검색하세요",
      bottom1: "구매하고 싶은 물품은 검색해서",
      bottom2: "쉽게 찾아보세요",
    },
    {
      img: home3,
      top: "Register",
      mid1: "판매를 원하는",
      mid2: "상품을 등록하세요",
      bottom1: "어떤 물건이든 판매하고 싶은 상품을",
      bottom2: "쉽게 등록하세요",
    },
  ];

  return (
    <div>
      {sections.map((section, i) => {
        return (
          <div>
            <section className="section">
              <div className={`section_box ${i % 2 === 1 ? "opp" : ""}`}>
                <img src={section.img} alt={`home${i}`} />
                <div className={`section_inner ${i % 2 === 1 ? "opp" : ""}`}>
                  <div className="text_top">{section.top}</div>
                  <div className="text_mid">{section.mid1}</div>
                  <div className="text_mid space">{section.mid2}</div>
                  <div className="text_bot">{section.bottom1}</div>
                  <div className="text_bot">{section.bottom2}</div>
                </div>
              </div>
            </section>
          </div>
        );
      })}
    </div>
  );
};
