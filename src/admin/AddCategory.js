import React, { useState } from 'react';
import { isAuthenticated } from '../auth/helper';
import { Link } from 'react-router-dom';
import Base from '../core/Base';
import { createCategory } from './helper/adminapicall';

const AddCategory = () => {
  const [name, setName] = useState('');
  const [err, setErr] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const goBack = () => (
    <div className="mt-5">
      <Link to="/admin/dashboard" className="btn btn-sm btn-dark mb-3">
        Admin Home
      </Link>
    </div>
  );

  const handleChange = e => {
    setErr('');
    setName(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    setErr('');
    setSuccess(false);
    createCategory(user._id, token, { name }).then(data => {
      if (data.err) setErr(true);
      else {
        setErr('');
        setSuccess(true);
        setName('');
      }
    });
  };
  const successMessage = () => {
    if (success) {
      return <h4 className="text-success">Category created successfully</h4>;
    }
  };

  const warningMessage = () => {
    if (err) {
      return <h4 className="text-danger">Failed to create category</h4>;
    }
  };
  const categoryForm = () => (
    <form>
      <div className="form-group">
        <p className="lead">Enter the Category</p>
        <input
          type="text"
          className="form-control mb-2"
          autoFocus
          placeholder="For ex. Summer"
          required
          onChange={handleChange}
          value={name}
        />
        <button onClick={onSubmit} className="btn btn-outline-info">
          Create Category
        </button>
      </div>
    </form>
  );

  return (
    <Base
      title="Create a category Here"
      description="Add a new category for new tshirts"
      className="container bg-primary p-4 rounded"
    >
      <div className="row bg-white rounded">
        <div className="col-md-2">{goBack()}</div>
        <div className="col-md-8">
          {successMessage()}
          {warningMessage()}
          {categoryForm()}
        </div>
      </div>
    </Base>
  );
};

export default AddCategory;
