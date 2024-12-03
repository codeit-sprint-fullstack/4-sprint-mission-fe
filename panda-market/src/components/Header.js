import React from 'react';

const Header = ({ setCurrentPage }) => {
  return (
    <header style={{ padding: '10px', background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center'}}>
        <img
          src="/Property 1=lg.png" // 로고 이미지 URL
          alt="Panda Market Logo"
          style={{ marginRight: '10px', width:'250px' }} // 이미지와 텍스트 간격
        />
      </div>
      <nav>
        <button style={{fontSize:'20px', paddingRight:'15px', border:'0', backgroundColor:'transparent'}}
         onClick={() => setCurrentPage('home')}>홈</button>
        <button style={{fontSize:'20px', paddingRight:'15px', border:'0', backgroundColor:'transparent'}}
         onClick={() => setCurrentPage('best-products')}>베스트 상품</button>
        <button style={{fontSize:'20px', border:'0', backgroundColor:'transparent'}}
         onClick={() => setCurrentPage('all-products')}>모든 상품</button>
      </nav>
    </header>
  );
};

export default Header;