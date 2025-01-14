import React from "react";
import Header from "./_components/Header";

function RootLayout({ children }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}

export default RootLayout;
