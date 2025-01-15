import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import BannerImage from '@/components/home/\bBannerImage';
import HomeMain from '@/components/home/HomeMain';

export default function HomePage() {
  return (
    <div>
      {/* <Header /> */}
      <BannerImage isTop={true} />
      <HomeMain />
      <BannerImage />
      {/* <Footer /> */}
    </div>
  );
}
