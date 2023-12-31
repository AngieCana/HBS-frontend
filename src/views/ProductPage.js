import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useReducer, useEffect } from "react";
import axios from "axios";
import { Helmet } from "react-helmet-async"
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { getError } from "../utilities/utils";
import { Store } from "../Store";
import { Button } from "react-bootstrap";

//function with 2 paramaters that holds a switch statement which checks if a speficic case is true and executes code upon that case.
const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, product: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function ProductPage() {
  const navigate = useNavigate();
  const params = useParams();
  const { slug } = params;

  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    product: {},
    loading: true,
    error: "",
  });
  //this calls the data from the backend as an api
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get(`/api/products/slug/${slug}`);
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        //displays product not found error
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    //called fetch function right after defining it
    fetchData();
  }, [slug]);

//defining the add to cart function
const { state, dispatch: ctxDispatch } = useContext(Store);
const {cart} = state;
  const addToCartHandler = async() => {
    const existItem = cart.cartItems.find((x) => x._id === product._id)
    const quantity = existItem ? existItem.quantity + 1 : 1;
    //ajax request
    const {data} = await axios.get(`/api/products/${product._id}`)
    if(data.countInStock < quantity){
      window.alert('Sorry, product is out of stock.')
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...product, quantity },
    }
    );
    navigate('/cart')
    console.log('Cart Button Clicked');
  };

  return loading ? (
    <div>
      <LoadingBox />
    </div>
  ) : error ? (
    <div>
      <MessageBox variant="danger">{error}</MessageBox>
    </div>
  ) : (
    <div>
      <div className="product-show-container">
        <div className="product-show-image">
          {/* this will render the images */}
          <img
            className="img-large"
            src={product.image}
            alt={product.name}
          ></img>
        </div>
        <div className="product-show-details">
          <div className="product-show-info">
            <Helmet>
              <title>{product.name}</title>
            </Helmet>
            <h1>{product.name}</h1>
            <hr/>
            <p>Price: ${product.price}</p>
            <p>Listed on: {product.listDate}</p>
            <p>Available: {product.countInStock} available.</p>
            <p>Description: {product.description}</p>
          </div>
          <hr/>
          <div className="product-show-action">
            {/* if countInStock is greater than 0, a button will appear to allow the user to add to cart. Else, "Out of Stock will appear on the site." */}
          {product.countInStock > 0 ? (
            <Button onClick={addToCartHandler}className="show-button" variant="primary">Add to Cart</Button>
          ) : (
            <p className="danger">Out of Stock</p>
          )}
        </div>
        </div>
      </div>
      
    </div>
  );
}

export default ProductPage;
