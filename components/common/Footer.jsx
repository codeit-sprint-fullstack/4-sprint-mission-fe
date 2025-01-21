import facebook from '@/assets/images/ic-facebook.png';
import twitter from '@/assets/images/ic-twitter.png';
import instagram from '@/assets/images/ic-instagram.png';
import youtube from '@/assets/images/ic-youtube.png';
import './Footer.css';
import Link from 'next/link';
import Image from 'next/image';

function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-content-left"> ©codeit - 2024 </div>
        <div className="footer-content-center">
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/faq">FAQ</Link>
        </div>
        <div className="footer-content-right">
          <Link
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={facebook} alt="facebook" title="facebook" />
          </Link>
          <Link
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={twitter} alt="twitter" title="twitter" />
          </Link>
          <Link
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={youtube} alt="youtube" title="youtube" />
          </Link>
          <Link
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={instagram} alt="instagram" title="instagram" />
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
