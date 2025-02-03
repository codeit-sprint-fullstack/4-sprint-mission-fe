import React from "react";
import Header from "./_components/Header";

import Footer from "./_components/Footer";

function Rootlayout({ children }) {
  return (
    <div>
      <div className="min-h-screen">
        <Header />
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default Rootlayout;
