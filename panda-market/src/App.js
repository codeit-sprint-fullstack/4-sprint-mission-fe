import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import BestProductsPage from './pages/BestProductsPage';
import AllProductsPage from './pages/AllProductsPage';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'best-products':
        return <BestProductsPage />;
      case 'all-products':
        return <AllProductsPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div>
      <Header setCurrentPage={setCurrentPage} />
      {renderPage()}
      <Footer />
    </div>
  );
};

export default App;