import React, { useEffect, useState } from 'react';
import '../styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Base from './Base';
import Card from './Card';
import { getProducts } from './helper/coreapicalls';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [err, setErr] = useState(false);

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    getProducts().then(data => {
      if (data.err) return setErr(data.err);
      setProducts(data);
    });
  };

  return (
    <Base title="Home Page" description="Welcome to the Tshirt Store">
      <div className="row">
        <h1 className="text-white">All of tshirts</h1>
      </div>
      <div className="row">
        {products.length > 0 ? (
          <>
            {products.map(product => (
              <div className="col-4 text-center" key={product._id}>
                <Card product={product} />
              </div>
            ))}
          </>
        ) : (
          <>
            <div className="col-12">
              <div className="text-center">
                <div
                  className="spinner-border text-warning"
                  style={{ width: '45px', height: '45px' }}
                >
                  <span className="sr-only">Loading</span>
                </div>
                <h4 className="text-warning">Loading...</h4>
              </div>
            </div>
          </>
        )}
      </div>
    </Base>
  );
};

export default Home;
