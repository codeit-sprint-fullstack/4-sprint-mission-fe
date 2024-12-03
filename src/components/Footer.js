import instagram from '../images/ic_instagram.png';
import facebook from '../images/ic_facebook.png';
import twitter from '../images/ic_twitter.png';
import youtube from '../images/ic_youtube.png';
import './Footer.css';

export function Footer() {
  return (
    <footer className="footer_container">
        <div>
            <p className="copyright">©codeit - 2024</p>
        </div>
        <div className="footer_text_style">
            <a href="privacy.html">
                <p className="footer_text">Privacy Policy</p>
            </a>
            <a href="faq.html">
                <p className="footer_text">FAQ</p>
            </a>
        </div>
        <div className="footer_sns_icons">
            <a href="https://www.facebook.com/">
                <img src={facebook} alt="facebook_icon"/>
            </a>
            <a href="https://www.twitter.com/">
                <img src={twitter} alt="twitter_logo"/>
            </a>
            <a href="https://www.youtube.com/">
                <img src={youtube} alt="youtube_logo"/>
            </a>
            <a href="https://www.instagram.com/">
                <img src={instagram} alt="instagram_logo"/>
            </a>
        </div>
    </footer>
  );
}

export default Footer;