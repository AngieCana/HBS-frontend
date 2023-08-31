import React from 'react'
import { Link } from 'react-router-dom'

export default function Product(props) {
  const { product } = props
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
          <button className="addcart">Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
