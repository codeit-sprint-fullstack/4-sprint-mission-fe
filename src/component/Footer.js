import "./Footer.css";
import ic_facebook from "../img/ic_facebook.svg";
import ic_instagram from "../img/ic_instagram.svg";
import ic_twitter from "../img/ic_twitter.svg";
import ic_youtube from "../img/ic_youtube.svg";
export const Footer = () => {
  return (
    <footer className="footerSection">
      <div className="footerInner">
        <span className="group1">©codeit - 2024 </span>

        <span className="group2">
          <a className="footerText" href="privacy.html">
            Privacy Policy
          </a>
          <a className="footerText" href="faq.html">
            FAQ
          </a>
        </span>

        <span className="group3">
          <a className="icon" href="https://www.facebook.com/">
            <img src={ic_facebook} alt="facebookIcon" />
          </a>
          <a className="icon" href="https://www.twitter.com/">
            <img src={ic_twitter} alt="twitterIcon" />
          </a>
          <a className="icon" href="https://www.youtube.com/">
            <img src={ic_youtube} alt="youtubeIcon" />
          </a>
          <a className="icon" href="https://www.instagram.com/">
            <img src={ic_instagram} alt="instagramIcon" />
          </a>
        </span>
      </div>
    </footer>
  );
};
