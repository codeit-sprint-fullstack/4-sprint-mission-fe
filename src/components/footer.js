import React from "react";

const Footer = () => (
  <footer>
    <p>&copy; codetit - 2024</p>
    <nav>
      <a href="/">Privacy Policy</a>
      <a href="/">FAQ</a>
    </nav>
    <div className="social-links">
      <a href="https://www.facebook.com/" target="_blank">
        <img src="/src/png/facebook.png" />
      </a>
      <a href="https://www.x.com/" target="_blank">
        <img src="/src/png/twitter.png" />
      </a>
      <a href="https://www.youtube.com/" target="_blank">
        <img src="/src/png/youtube.png" />
      </a>
      <a href="https://www.instagram.com/" target="_blank">
        <img src="/src/png/insta.png" />
      </a>
    </div>
  </footer>
);

export default Footer;
