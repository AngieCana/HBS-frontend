import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./views/Home";
import ProductPage from "./views/ProductPage";
import AboutMe from "./views/AboutMe";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";
import Nav from "react-bootstrap/Nav";
import { useContext } from "react";
import { Store } from "./Store";
import Badge from "react-bootstrap/Badge";
import CartScreen from "./views/CartScreen";
import LogIn from "./views/LogIn";
import SignUp from "./views/SignUp";
import MySideNav from "./components/MySideNav";

function App() {
  const { state } = useContext(Store);
  const { cart } = state;
  const currentRoute = window.location.pathname;
  
  // Define different heights for each page
  const pageHeights = {
    home: "100vh",
    cart: "90vh",
    signin: "80vh",
  };

  return (
    <div className="d-flex flex-column site-container">
      {/* Conditionally pass the height prop for the home page */}
      
      <header className="App-header">
        <Navbar bg="secondary" variant="dark">
       
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand className="shop-name">
                Hopes & Blessings Hobby Shop |
              </Navbar.Brand>
            </LinkContainer>
            <Nav className="me-auto">
              <div className="cart-container ml-auto">
                <LinkContainer to="/cart">
                  <Nav.Link className="c-text">
                    Cart
                    {cart.cartItems.length > 0 && (
                      <Badge pill bg="danger">
                        {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                      </Badge>
                    )}
                  </Nav.Link>
                </LinkContainer>
              </div>
            </Nav>
          </Container>
        </Navbar>
      </header>
      <main>
      {currentRoute === "/" ? (
        <MySideNav height={pageHeights[currentRoute]} />
      ) : (
        <MySideNav />
      )}
        <Container>
          <Routes>
            <Route path="/about" element={<AboutMe />} />
            <Route path="/product/:slug" element={<ProductPage />} />
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/signin" element={<LogIn />} />
            {/* <Route path="signup" element={<SignUp />} /> */}
            <Route path="/" element={<Home />} />
          </Routes>
        </Container>
      </main>
      <div className="footer-container">
        <footer>
          <LinkContainer to="/about">
            <Nav.Link>About Me</Nav.Link>
          </LinkContainer>
          <p>All rights Reserved</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
