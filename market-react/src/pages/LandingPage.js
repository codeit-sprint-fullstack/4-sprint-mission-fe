import BannerImage from "../components/BannerImage.js";
import Footer from "../components/Footer.js";
import Header from "../components/Header.js";
import LandingMain from "../components/LandingMain.js";

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