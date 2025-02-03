import React from "react";

function AuthLayout({ children }) {
  return (
    <div className={`min-w-max min-h-screen  flex items-center`}>
      {children}
    </div>
  );
}

export default AuthLayout;
