import { NavigationBar } from "../component/NavigationBar";
import { Footer } from "../component/Footer";
import { Header } from "../component/Header";
import { MainSection } from "../component/MainSection";
import { MainBottom } from "../component/MainBottom";
import "./MainPage.css";

function MainPage() {
  return (
    <div className="container">
      <NavigationBar showMenu={false} />
      <Header />
      <MainSection></MainSection>
      <MainBottom></MainBottom>
      <Footer />
    </div>
  );
}
export default MainPage;
