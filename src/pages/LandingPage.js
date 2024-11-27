import BannerImage from "../components/BannerImage";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LandingMain from "../components/LandingMain";

function LandingPage() {
  return (
    <div>
      <Header isLandingPage={true} />
      <BannerImage isTop={true} />
      <LandingMain />
      <BannerImage />
      <Footer />
    </div>
  );
}
export default LandingPage;
