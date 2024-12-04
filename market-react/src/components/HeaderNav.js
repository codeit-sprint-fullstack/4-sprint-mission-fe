import { NavLink } from "react-router-dom";
import "./HeaderNav.css";

function getLinkStyle({ isActive }) {
  return { color: isActive ? "#3692FF" : undefined };
}

const NAVS = [
  { title: "중고마켓", link: "/items" },
  { title: "자유게시판", link: "/freepost" },
];

function HeaderNav() {
  return (
    <div className="nav-container">
      {NAVS.map((nav, i) => {
        return (
          <span className="menu" key={i}>
            <NavLink to={nav.link} style={getLinkStyle}>
              {nav.title}
            </NavLink>
          </span>
        );
      })}
    </div>
  );
}

export default HeaderNav;