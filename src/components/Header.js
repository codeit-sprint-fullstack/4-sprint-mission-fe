import logoM from "../assets/logo-m.png";
import logo from "../assets/logo.png";
import "./Header.css";
import HeaderNav from "./HeaderNav";

function Header() {
  return (
    <header>
      <div className="header-content">
        <div className="header-content-left">
          <a href="/">
            <img src={logoM} id="logoM" alt="판다마켓 로고" />
            <img src={logo} id="logo" alt="판다마켓 로고" />
          </a>
        </div>
        <div className="header-content-center">
          <HeaderNav />
        </div>
        <div className="header-content-right">
          <a className="button" href="/login">
            로그인
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;
