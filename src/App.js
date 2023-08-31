import "./App.css";
import { Link, BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import ProductPage from "./views/ProductPage";
import AboutMe from "./views/AboutMe";
import Footer from "./components/Footer";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";
import Nav from "react-bootstrap/Nav";
import { useContext } from "react";
import { Store } from "./Store";
import Badge from "react-bootstrap/Badge";

function App() {
  const { state } = useContext(Store);
  const { cart } = state;
  return (
    <div className="d-flex flex-column site-container">
      <header className="App-header">
        {/* <Link to="/" className="name">
          Hopes and Blessings Hobby Shop
        </Link> */}
        {/* <Navbar className="nav" /> */}
        <Navbar bg="secondary" variant="dark">
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand>Hopes & Blessings Hobby Shop</Navbar.Brand>
            </LinkContainer>
            <Nav>
              <Link to="/cart" className="nav-link">
                Cart
                {cart.cartItems.length > 0 && (
                  <Badge pill bg="danger" className="badge-style">
                    {cart.cartItems.length}
                  </Badge>
                )}
              </Link>
            </Nav>
          </Container>
        </Navbar>
      </header>
      <main>
        <Container>
          <Routes>
            <Route path="/product/:slug" element={<ProductPage />} />
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutMe />} />
          </Routes>
        </Container>
      </main>
      <div className="footer-container">
        <Footer>
          <AboutMe />
        </Footer>
        <footer>All rights reserved</footer>
      </div>
    </div>
  );
}

export default App;
