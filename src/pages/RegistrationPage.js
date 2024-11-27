import Footer from "../components/Footer";
import Header from "../components/Header";
import RegistrationForm from "../components/RegistrationForm";
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
