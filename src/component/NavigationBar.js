import pandaImage from "../img/panda.svg";
import "./NavigationBar.css";
import "../Global.css";
import { Link, NavLink } from "react-router-dom";

export const NavigationBar = ({ showMenu = true }) => {
  const getLinkStyle = ({ isActive }) => {
    return {
      color: isActive
        ? "var(--button-active-color)"
        : "var(--favorite-text-color)",
    };
  };

  return (
    <nav className="NavigationBar">
      <div className="NavigationMenu">
        <Link to="/">
          <img src={pandaImage} alt="pandaImage" />
        </Link>
        {showMenu && (
          <>
            <NavLink>자유게시판</NavLink>
            <NavLink to="/items" style={getLinkStyle}>
              중고마켓
            </NavLink>
          </>
        )}
      </div>
      <a href="./" className="login button user">
        로그인
      </a>
    </nav>
  );
};
