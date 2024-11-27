import { NavLink } from "react-router-dom";
import "./HeaderNav.css";

function getLinkStyle({ isActive }) {
  console.log(isActive);
  return { color: isActive ? "#3692FF" : undefined };
}

function HeaderNav() {
  return (
    <div className="nav-container">
      <span className="menu">
        <NavLink to="/items" style={getLinkStyle}>
          중고마켓
        </NavLink>
      </span>
      <span className="menu">
        <NavLink to="/freeboard" style={getLinkStyle}>
          자유게시판
        </NavLink>
      </span>
    </div>
  );
  // !!!!!!!!!!!! 아래와 같이 map으로 NavLink를 만들 경우 isActive값이 모두 true가 되어 버림!!!!
  // return (
  //   <div className="nav-container">
  //     {NAV_MENUS.map(({ id, title, link }) => {
  //       return (
  //         <span key={id} className="menu">
  //           <NavLink to={link} style={getLinkStyle}>
  //             {title}
  //           </NavLink>
  //         </span>
  //       );
  //     })}
  //   </div>
  // );
}

export default HeaderNav;
