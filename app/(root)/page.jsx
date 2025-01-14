import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';

export default function HomePage({ children }) {
  return (
    <div>
      <Header isLandingPage={true} />
      {children}
      <Footer />
    </div>
  );
}
