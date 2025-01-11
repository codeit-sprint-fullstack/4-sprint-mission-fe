import Header from '@/components/Header';
import React from 'react';

function Rootlayout({ children }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}

export default Rootlayout;
