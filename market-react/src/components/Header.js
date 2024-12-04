import { Link } from "react-router-dom";
import logoM from "../assets/logo-m.png";
import logo from "../assets/logo.png";
import "./Header.css";
import HeaderNav from "./HeaderNav.js";

function Header({ isLandingPage }) {
  return (
    <header>
      <div className="header-content">
        <div className="header-content-left">
          <Link to="/">
            <img src={logoM} id="logoM" alt="판다마켓 로고" />
            <img src={logo} id="logo" alt="판다마켓 로고" />
          </Link>
        </div>
        <div className="header-content-center">
          {isLandingPage || <HeaderNav />}
        </div>
        <div className="header-content-right">
          <Link className="button" to="/login">
            로그인
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;