import React from 'react';

const Navigator = () => (
  <header>
    <div className="logo">
      <img src="/src/png/logo" />
    </div>
    <nav>
      <a href="/">자유게시판</a>
      <a href="/">중고마켓</a>
    </nav>
    <button className="login-btn">로그인</button>
  </header>
);

export default Navigator;
