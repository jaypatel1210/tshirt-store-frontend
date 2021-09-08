import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { addItemToCart, removeItemFromCart } from './helper/cartHelper';
import ImageHelper from './helper/ImageHelper';

const Card = ({
  product,
  addToCart = true,
  removeFromCart = false,
  setReload = f => f,
  reload = undefined,
}) => {
  const [redirect, setRedirect] = useState(false);
  // const [count, setCount] = useState(product.count);
  const cartTitle = product ? product.name : 'A photo from pexels';
  const cartDescription = product ? product.description : 'DEFAULT';
  const cartPrice = product ? product.price : 'DEFAULT';

  const cartItemAdd = () => {
    addItemToCart(product, () => setRedirect(true));
  };

  const getARedirect = redirect => {
    if (redirect) return <Redirect to="/cart" />;
  };

  const showAddToCart = addToCart =>
    addToCart && (
      <div className="col-12">
        <button
          onClick={cartItemAdd}
          className="btn btn-block btn-outline-success mt-2 mb-2"
        >
          Add to Cart
        </button>
      </div>
    );

  const showRemoveFromCart = removeFromCart =>
    removeFromCart && (
      <div className="col-12">
        <button
          onClick={() => {
            removeItemFromCart(product._id);
            setReload(!reload);
          }}
          className="btn btn-block btn-outline-danger mt-2 mb-2"
        >
          Remove from cart
        </button>
      </div>
    );

  return (
    <div className="card text-white bg-dark border border-info">
      <div className="card-header lead">{cartTitle}</div>
      {getARedirect(redirect)}
      <div className="card-body">
        <ImageHelper product={product} />
        <p className="lead bg-success font-weight-normal text-wrap">
          {cartDescription}
        </p>
        <p className="btn btn-success rounded  btn-sm px-4">₹{cartPrice}</p>
        <div className="row">
          {showAddToCart(addToCart)}
          {showRemoveFromCart(removeFromCart)}
        </div>
      </div>
    </div>
  );
};

export default Card;
