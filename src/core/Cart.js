import React, { useEffect, useState } from 'react';
import Base from './Base';
import Card from './Card';
import { loadProducts } from './helper/cartHelper';
const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);
  useEffect(() => {
    setProducts(loadProducts());
  }, [reload]);

  const loadAllProduct = () => (
    <div>
      {products.map(product => (
        <Card
          key={product._id}
          product={product}
          addToCart={false}
          removeFromCart={true}
          setReload={setReload}
          reload={reload}
        />
      ))}
    </div>
  );
  const loadCheckout = () => {
    //
  };

  return (
    <Base title="Cart Page" description="Ready to Checkout">
      <div className="row text-center">
        <div className="col-6">{loadAllProduct()}</div>
        <div className="col-6">{loadCheckout()}</div>
      </div>
    </Base>
  );
};

export default Cart;
