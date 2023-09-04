import axios from 'axios';
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Store } from '../Store';
import Button from 'react-bootstrap/Button';

export default function Product(props) {
  const { product } = props

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
//adding button functionality to the home product
  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === product._id)
    const quantity = existItem ? existItem.quantity + 1 : 1;
  //fetches data from the backend to get the current product
  const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert(`Sorry. ${product.name} is out of stock`);
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };
  return (
    <div className="product" >
      <Link to={`/product/${product.slug}`}>
        <img src={product.image} alt={product.name} />
      </Link>
      <div className="info-container">
        <div className="name-container">
          <Link className="link" to={`/product/${product.slug}`}>
            <p>{product.name}</p>
          </Link>
        </div>
        <div className="price-container">
          <p>
            <strong>${product.price}</strong>
          </p>
          {product.countInStock === 0 ? 
          console.log(product.countInStock)
          (
          <Button variant="light" disabled>
            Out of stock
          </Button>
        ) : (
          <Button onClick={() => addToCartHandler(product)}>Add to cart</Button>
        )}
        </div>
      </div>
    </div>
  );
}
