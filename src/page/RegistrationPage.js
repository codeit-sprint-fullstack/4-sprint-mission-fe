import { Footer } from "../component/Footer";
import { NavigationBar } from "../component/NavigationBar";
import { RegistrationInput } from "../component/RegistrationInput";
import { createProduct } from "../api/ProductsService";
export const RegistrationPage = () => {
  return (
    <div>
      <NavigationBar></NavigationBar>
      <RegistrationInput onSubmit={createProduct}></RegistrationInput>
      <Footer></Footer>
    </div>
  );
};
