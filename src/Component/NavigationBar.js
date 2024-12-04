import pandaImage from "../img/panda.svg";
import "./NavigationBar.css";
import "../Global.css";

export const NavigationBar = () => {
  return (
    <nav className="NavigationBar">
      <div className="NavigationMenu">
        <img src={pandaImage} alt="pandaImage" />
        <div> 자유게시판 </div>
        <div> 중고마켓</div>
      </div>
      <a href="./" className="login button user">
        로그인
      </a>
    </nav>
  );
};
