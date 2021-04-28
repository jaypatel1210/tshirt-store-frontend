import React, { useEffect, useState } from 'react';
import Base from './Base';
import Card from './Card';
import { loadProducts } from './helper/cartHelper';
import PaymentB from './PaymentB';

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);
  useEffect(() => {
    setProducts(loadProducts());
  }, [reload]);

  //const loadAllProduct = () => (
  const loadAllProduct = products => (
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

  return (
    <Base title="Cart Page" description="Ready to Checkout">
      <div className="row text-center">
        <div className="col-6">
          {products.length > 0 ? (
            loadAllProduct(products)
          ) : (
            // loadAllProduct()
            <h3 className="text-white">Cart is Empty</h3>
          )}
        </div>
        <div className="col-6">
          <PaymentB products={products} setReload={setReload} />
        </div>
      </div>
    </Base>
  );
};

export default Cart;
