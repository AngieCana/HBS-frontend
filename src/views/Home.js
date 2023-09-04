import React, { useEffect, useReducer, useState } from "react";
import axios from "axios";
import Product from "../components/Product";
import { Helmet } from "react-helmet-async";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { useLocation } from "react-router";

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
  const location = useLocation();
  //changed hook from useState to useReducer that checks 3 parameters, also imported logger
  const [{ loading, error, products }, dispatch] = useReducer((reducer), {
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
      <Helmet>
        <title>Hopes & Blessings Hobby Shop</title>
      </Helmet>
      <h1 className="top8">Ranking: Top 8 Products</h1>
      <h6 className="text-center">*Hello {location.state && location.state.id ? location.state.id : "Guest"} and welcome to the Home Page.*</h6>

      <div className="products">
        {/* ternary operator that checks if products are loading, if they are, they will display a loading screen. if there is an error, they will display the error message. else, they will map through the items normally. */}
        {loading ? (
          <div>
            <LoadingBox />
          </div>
        ) : error ? (
          <div>
            <MessageBox variant="danger">{error}</MessageBox>
          </div>
        ) : (
          //mapping through the products array and assigning a className, a "slug"(identifier) a speficic link for the item, the item image, and the item name.
          products.map((product) => (
            <Product product={product}></Product>
          ))
        )}
      </div>
    </div>
  );
}
