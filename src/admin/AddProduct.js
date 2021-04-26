import React, { useState, useEffect } from 'react';
import Base from '../core/Base';
import { Link } from 'react-router-dom';
import { createProduct, getCategories } from './helper/adminapicall';
import { isAuthenticated } from '../auth/helper';
const AddProduct = ({ history }) => {
  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    categories: [],
    loading: false,
    err: '',
    createdProduct: '',
    getaRedirect: false,
    formData: '',
  });

  const {
    name,
    description,
    price,
    stock,
    categories,
    createdProduct,
    err,
    formData,
    getaRedirect,
    loading,
  } = values;
  const preload = () => {
    getCategories()
      .then(data => {
        if (data.err) return setValues({ ...values, err: data.err });
        else
          setValues({ ...values, categories: data, formData: new FormData() });
      })
      .catch(console.log('Not able to load categories'));
  };
  useEffect(() => {
    preload();
  }, []);
  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, err: '', loading: true });
    createProduct(user._id, token, formData)
      .then(data => {
        if (data.err)
          return setValues({
            ...values,
            err: data.err,
            getaRedirect: false,
            loading: false,
          });
        else {
          setValues({
            ...values,
            name: '',
            description: '',
            price: '',
            photo: '',
            stock: '',
            loading: false,
            createdProduct: data.name,
            err: '',
            getaRedirect: '/admin/dashboard',
          });
        }
      })
      .catch(console.log('Error in Creating Product'));
  };
  const handleChange = name => event => {
    const value = name === 'photo' ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value, err: '' });
  };

  const successMessage = () => (
    <div
      className="alert alert-success mt-3"
      style={{ display: createdProduct ? '' : 'none' }}
    >
      <h5>{createdProduct} Created Successfully</h5>
    </div>
  );
  const errMessage = () => (
    <div
      className="alert alert-danger mt-3"
      style={{ display: err ? '' : 'none' }}
    >
      <h5>{err}</h5>
    </div>
  );
  const redirectToAdmin = () => {
    return setTimeout(() => {
      setValues({ ...values, getaRedirect: false });
      history.push('/admin/dashboard');
    }, 3000);
  };
  const createProductForm = () => (
    <form>
      <span>Post photo</span>
      <div className="form-group">
        <label className="btn btn-block btn-success">
          <input
            onChange={handleChange('photo')}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange('name')}
          name="photo"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group">
        <textarea
          onChange={handleChange('description')}
          name="photo"
          className="form-control"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange('price')}
          type="number"
          className="form-control"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="form-group">
        <select
          onChange={handleChange('category')}
          className="form-control"
          placeholder="Category"
        >
          <option>Select</option>
          {categories &&
            categories.map(cate => (
              <option value={cate._id} key={cate._id}>
                {cate.name}
              </option>
            ))}
        </select>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange('stock')}
          type="number"
          className="form-control"
          placeholder="Quantity"
          value={stock}
        />
      </div>

      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-outline-success mb-2"
      >
        Create Product
      </button>
    </form>
  );

  return (
    <Base
      title="Add a product here!"
      description="Welcome to product creation section"
      className="container bg-primary p-3"
    >
      <div className="row bg-dark text-white rounded">
        <div className="col-md-2">
          <Link
            to="/admin/dashboard"
            className="btn btn-sm btn-light mb-3 mt-2"
          >
            Admin Home
          </Link>
        </div>
        <div className="col-md-8">
          {successMessage()}
          {errMessage()}
          {createProductForm()}
          {getaRedirect && redirectToAdmin()}
        </div>
      </div>
    </Base>
  );
};

export default AddProduct;
