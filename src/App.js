import './App.css';
import NavBar from './NavBar';
import Footer from './Footer';
import ProductList from './ProductList';

function App() {
  return (
    <div className="header">
      <div>
        <NavBar/>
      </div>
      <div className="main">
        <ProductList/>
      </div>
      <div className="footer">
        <Footer/>
      </div>
      
    </div>
  );
}

export default App;
