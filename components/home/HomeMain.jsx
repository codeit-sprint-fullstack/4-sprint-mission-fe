import imgSection01 from '@/assets/images/img-home-01.png';
import imgSection02 from '@/assets/images/img-home-02.png';
import imgSection03 from '@/assets/images/img-home-03.png';
import Image from 'next/image';

const SECTION_DATA = [
  {
    img: imgSection01,
    badge: 'Hot item',
    title1: '인기 상품을',
    title2: '확인해 보세요',
    desc1: '가장 HOT한 중고거래 물품을',
    desc2: '판다 마켓에서 확인해 보세요',
  },
  {
    img: imgSection02,
    badge: 'Search',
    title1: '구매를 원하는',
    title2: '상품을 검색하세요',
    desc1: '구매하고 싶은 물품은 검색해서',
    desc2: '쉽게 찾아보세요',
  },
  {
    img: imgSection03,
    badge: 'Register',
    title1: '판매를 원하는',
    title2: '상품을 등록하세요',
    desc1: '어떤 물건이든 판매하고 싶은 상품을',
    desc2: '쉽게 등록하세요',
  },
];

function Section({ section, index }) {
  const { img, badge, title1, title2, desc1, desc2 } = section;
  const classNameContent =
    index % 2 === 0 ? 'pl-[50px] w-[420px]' : 'pr-[50px] w-[420px] text-right';
  const classNameImg = index % 2 === 0 ? 'w-1/2' : 'w-1/2 order-1';

  return (
    <section className="bg-white mx-auto my-0 py-[138px] px-0 w-full flex justify-center items-center">
      <div className="bg-[#fcfcfc] w-[988px] h-[444px] flex items-center">
        <Image className={classNameImg} src={img} alt="hot" priority />
        <div className={classNameContent}>
          <div className="text-lg text-[#3692FF] font-bold mb-3">{badge} </div>
          <div className="text-[40px] font-bold leading-tight">
            {title1}
            <br className="break-t" /> {title2}
          </div>
          <div className="text-[24px] font-medium mt-6 leading-tight">
            {desc1}
            <br /> {desc2}
          </div>
        </div>
      </div>
    </section>
  );
}

function HomeMain() {
  return (
    <main>
      {SECTION_DATA.map((section, i) => {
        return <Section key={i} section={section} index={i} />;
      })}
    </main>
  );
}
export default HomeMain;
