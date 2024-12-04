import "./LandingMain.css";
import imgSection01 from "../assets/img-home-01.png";
import imgSection02 from "../assets/img-home-02.png";
import imgSection03 from "../assets/img-home-03.png";

const SECTION_DATA = [
  {
    img: imgSection01,
    badge: "Hot item",
    title1: "인기 상품을",
    title2: "확인해 보세요",
    desc1: "가장 HOT한 중고거래 물품을",
    desc2: "판다 마켓에서 확인해 보세요",
  },
  {
    img: imgSection02,
    badge: "Search",
    title1: "구매를 원하는",
    title2: "상품을 검색하세요",
    desc1: "구매하고 싶은 물품은 검색해서",
    desc2: "쉽게 찾아보세요",
  },
  {
    img: imgSection03,
    badge: "Register",
    title1: "판매를 원하는",
    title2: "상품을 등록하세요",
    desc1: "어떤 물건이든 판매하고 싶은 상품을",
    desc2: "쉽게 등록하세요",
  },
];

function Section({ section, index }) {
  const { img, badge, title1, title2, desc1, desc2 } = section;
  const classNameContent =
    index % 2 === 0 ? "section-content" : "section-content even";
  const classNameImg = index % 2 === 0 ? "section-image" : "section-image even";

  return (
    <section>
      <div className="section-box">
        <img className={classNameImg} src={img} width="50%" alt="hot" />
        <div className={classNameContent}>
          <div className="badge">{badge} </div>
          <div className="title">
            {title1}
            <br className="break-t" /> {title2}
          </div>
          <div className="desc">
            {desc1}
            <br /> {desc2}
          </div>
        </div>
      </div>
    </section>
  );
}

function LandingMain() {
  return (
    <main>
      {SECTION_DATA.map((section, i) => {
        return <Section key={i} section={section} index={i} />;
      })}
    </main>
  );
}
export default LandingMain;