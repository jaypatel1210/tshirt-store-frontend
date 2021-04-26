import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';
import { deleteProduct, getProducts } from './helper/adminapicall';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);

  const { user, token } = isAuthenticated();

  const preload = () => {
    getProducts().then(data => {
      if (data.err) return console.log(data.err);
      setProducts(data);
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const deleteThisProduct = product => {
    if (window.confirm(`Are you sure to delete ${product.name}`)) {
      deleteProduct(product._id, user._id, token).then(data => {
        if (data.err) return console.log(data.err);
        preload();
      });
    }
  };

  return (
    <Base title="Welcome admin" description="Manage products here">
      <Link className="btn btn-info mb-2" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <h2 className="mb-1">All products:</h2>

      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-white my-3">
            Total {products.length} Tshirts
          </h2>

          {products.map(product => (
            <div key={product._id} className="row text-center mb-2 ">
              <div className="col-4">
                <h3 className="text-white text-left">{product.name}</h3>
              </div>
              <div className="col-4">
                <Link
                  className="btn btn-success"
                  to={`/admin/product/update/${product._id}`}
                >
                  <span className="">Update</span>
                </Link>
              </div>
              <div className="col-4">
                <button
                  onClick={() => {
                    deleteThisProduct(product);
                  }}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Base>
  );
};

export default ManageProducts;
