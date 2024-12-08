import logo from '../images/logo.png';
import '../styles/NavBar.css';

export function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-tap">
      <a className="navbar-brand" href="#">
        <img className="navbar-logo" src={logo} alt="logo"/>
      </a>
        <a className="navbar-board" href="/">자유게시판</a>
        <a className="navbar-board" href="/">중고마켓</a>
      </div>
      <button className="login-button">로그인</button>
    </nav>
  );
}

export default NavBar;