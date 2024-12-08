import logo from '../images/logo.png';
import '../styles/NavBar.css';
import { NavLink } from 'react-router-dom';

export function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-tap">

        <NavLink to="/" className="navbar-brand">
          <img className="navbar-logo" src={logo} alt="logo" />
        </NavLink>

        <NavLink to="/" className="navbar-board">
          자유게시판
        </NavLink>

        <NavLink
          to="/items"
          className={({ isActive }) =>
            isActive ? "navbar-market-active" : "navbar-market"
          }
        >
          중고마켓
        </NavLink>
      </div>

      <button className="login-button">로그인</button>
    </nav>
  );
}

export default NavBar;
