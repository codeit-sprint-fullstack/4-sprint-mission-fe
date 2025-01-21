import imgBannerTop from '@/assets/images/img-home-top.png';
import imgBannerBottom from '@/assets/images/img-home-bottom.png';
import Link from 'next/link';
import Image from 'next/image';

function BannerImage({ isTop }) {
  const img = isTop ? imgBannerTop : imgBannerBottom;
  const imgHeight = isTop ? '340px' : '375px';
  const text1 = isTop ? '일상의 모든 물건을 ' : '믿을 수 있는';
  const text2 = isTop ? '거래해 보세요' : '판다마켓 중고 거래';

  return (
    <div className="h-[540px] bg-[#cfe5ff] relative flex justify-center">
      <div className="flex absolute bottom-0">
        <div className="text-[40px] font-bold flex flex-col justify-center">
          <span className="mb-8 leading-tight">
            {text1}
            <br className="block" />
            {text2}
          </span>
          {isTop && (
            <Link href="/products">
              <button className="h-14 shrink-0 w-[357px] bg-[#3692FF] text-white rounded-full hover:bg-[#1469CF] flex justify-center items-center mb-15">
                <p className="mr-2 text-[20px] font-medium">구경하러 가기</p>
              </button>
            </Link>
          )}
        </div>
        <Image
          src={img}
          className={`w-[745px] h-[${imgHeight}]`}
          alt="top-banner"
        />
      </div>
    </div>
  );
}
export default BannerImage;
