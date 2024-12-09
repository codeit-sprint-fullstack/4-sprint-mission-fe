import NavBar from "../components/NavBar";
import Content from "../components/Content";
import Footer from "../components/Footer";
import Banner from "../components/Banner";
import "../styles/MainPage.css";
import "../images/Img_home_top.png";
import "../images/Img_home_bottom.png"

export function MainPage() {
    const top_banner_image = require("../images/Img_home_top.png");
    const bottom_banner_image = require("../images/Img_home_bottom.png");
    
  return (
    <div className="main_container">
      <NavBar />
      <Banner image={top_banner_image} toptext="일상의 모든 물건을" bottomtext="거래해 보세요" link="button_visible" />
      <Content />
      <Banner image={bottom_banner_image} toptext="믿을 수 있는" bottomtext="판다마켓 중고 거래" />
      <Footer />
    </div>
  );
}

export default MainPage;