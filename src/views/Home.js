import React, { useEffect, useReducer, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import logger from "use-reducer-logger";

//function with 2 paramaters that holds a switch statement which checks if a speficic case is true and executes code upon that case.
const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, products: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function Home() {
  //changed hook from useState to useReducer that checks 3 parameters, also imported logger
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: "",
  });
  // const [products, setProducts] = useState([]);
  //this calls the data from the backend as an api
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get("/api/products");
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }

      // setProducts(result.data);
    };
    //called fetch function right after defining it
    fetchData();
  }, []);
  return (
    <div>
      <h1>Top 8 Products</h1>

      <div className="products">
        {/* ternary operator that checks if products are loading, if they are, they will display a loading screen. if there is an error, they will display the error message. else, they will map through the items normally. */}
        {loading ? (
          <div>Loading</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          //mapping through the products array and assigning a className, a "slug"(identifier) a speficic link for the item, the item image, and the item name.
          products.map((product) => (
            <div className="product" key={product.slug}>
              <a href={`/products/${product.slug}`}>
                <img src={product.image} alt={product.name} />
              </a>
              <div className="info-container">
                <div className="name-container">
                  {/* Import Link from react-router-dom */}
                  <Link className="link" to={`/product/${product.slug}`}>
                    <p>{product.name}</p>
                  </Link>
                </div>
                <div className="price-container">
                  <p>
                    <strong>${product.price}</strong>
                  </p>
                  <button className="addcart">Add to Cart</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
