import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';

function Articleslayout({ children }) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default Articleslayout;
