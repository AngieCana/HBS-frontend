import "./App.css";
import { Link, BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from 'react-router-dom';
import Home from "./views/Home";
import ProductPage from "./views/ProductPage";


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Link to="/">Hopes and Blessings Hobby Shop</Link>
      </header>
      <main>
        <Routes>
          <Route path="/product/:slug" element={<ProductPage/>}/>
          <Route path="/" element={<Home/>}/>
        </Routes>
        
      </main>
    </div>
  );
}

export default App;
