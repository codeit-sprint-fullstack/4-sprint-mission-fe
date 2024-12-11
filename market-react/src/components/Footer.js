import facebook from "../assets/ic-facebook.png";
import twitter from "../assets/ic-twitter.png";
import instagram from "../assets/ic-instagram.png";
import youtube from "../assets/ic-youtube.png";
import "./Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-content-left"> ©codeit - 2024 </div>
        <div className="footer-content-center">
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/faq">FAQ</Link>
        </div>
        <div className="footer-content-right">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={facebook} alt="facebook" title="facebook" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={twitter} alt="twitter" title="twitter" />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={youtube} alt="youtube" title="youtube" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={instagram} alt="instagram" title="instagram" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;