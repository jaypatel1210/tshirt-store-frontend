import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';
import { deleteCategory, getCategories } from './helper/adminapicall';

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);

  const { user, token } = isAuthenticated();

  const preload = () => {
    getCategories().then(data => {
      if (data.err) return console.log(data.err);
      setCategories(data);
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const deleteThisCategory = category => {
    if (window.confirm(`Are you sure to delete ${category.name}`)) {
      deleteCategory(category._id, user._id, token).then(data => {
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
      <h2 className="mb-1">All Category:</h2>

      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-white my-3">
            Total {categories.length} Tshirts
          </h2>

          {categories.map(cate => (
            <div key={cate._id} className="row text-center mb-2 ">
              <div className="col-4">
                <h3 className="text-white text-left">{cate.name}</h3>
              </div>
              <div className="col-4">
                <Link
                  className="btn btn-success"
                  to={`/admin/category/update/${cate._id}`}
                >
                  <span className="">Update</span>
                </Link>
              </div>
              <div className="col-4">
                <button
                  onClick={() => {
                    deleteThisCategory(cate);
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

export default ManageCategories;
