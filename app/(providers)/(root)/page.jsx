import BannerImage from '@/components/home/BannerImage';
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
