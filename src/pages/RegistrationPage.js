import React from "react";
import NavBar from "../components/NavBar";
import RegistrationForm from "../components/RegistrationForm";
import Footer from "../components/Footer";
import "../styles/RegistrationPage.css";

export function RegistrationPage() {
  return (
    <div className="registration_container">
      <NavBar />
      <RegistrationForm />
      <Footer />
    </div>
  );
}

export default RegistrationPage;