import { NavLink } from "react-router-dom";
import "./HeaderNav.css";

function getLinkStyle({ isActive }) {
  console.log(isActive);
  return { color: isActive ? "#3692FF" : undefined };
}

const NAVS = [
  { title: "중고마켓", link: "/items" },
  { title: "자유게시판", link: "/freeboard" },
];

function HeaderNav() {
  return (
    <div className="nav-container">
      {NAVS.map((nav) => {
        return (
          <span className="menu">
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
