import Footer from "../components/Footer.js";
import Header from "../components/Header.js";
import RegistrationForm from "../components/RegistrationForm.js";
import "./RegistrationPage.css";

function RegistrationPage() {
  return (
    <div>
      <Header />
      <main>
        <RegistrationForm />
      </main>
      <Footer />
    </div>
  );
}

export default RegistrationPage;