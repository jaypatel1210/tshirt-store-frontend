import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';
import { getCategory, updateSingleCategory } from './helper/adminapicall';

const UpdateCategory = ({ match, history }) => {
  const [name, setName] = useState('');
  const [err, setErr] = useState(false);
  const [success, setSuccess] = useState(false);
  const { user, token } = isAuthenticated();

  useEffect(() => {
    preloadCategory();
  }, []);

  const preloadCategory = () => {
    getCategory(match.params.categoryId).then(data => {
      if (data.err) return setErr(data.err);
      setName(data.name);
    });
  };

  const handleChange = e => {
    setErr('');
    setName(e.target.value);
  };
  const onUpdate = e => {
    e.preventDefault();
    setErr('');
    setSuccess(false);
    updateSingleCategory(match.params.categoryId, user._id, token, name).then(
      data => {
        if (data.err) setErr(true);
        else {
          setErr('');
          setSuccess(true);
          setTimeout(() => {
            setSuccess('');
            history.push('/admin/categories');
          }, 3000);
        }
      }
    );
  };
  const goBack = () => (
    <div className="mt-5">
      <Link to="/admin/dashboard" className="btn btn-sm btn-dark mb-3">
        Admin Home
      </Link>
    </div>
  );
  const categoryForm = () => (
    <form>
      <div className="form-group">
        <p className="lead">Update the Category</p>
        <input
          type="text"
          className="form-control mb-2"
          autoFocus
          placeholder="For ex. Summer"
          required
          onChange={handleChange}
          value={name}
        />
        <button onClick={onUpdate} className="btn btn-outline-info">
          Update Category
        </button>
      </div>
    </form>
  );
  const successMessage = () => {
    if (success) {
      return <h4 className="text-success">Category Updated successfully</h4>;
    }
  };
  const warningMessage = () => {
    if (err) {
      return <h4 className="text-danger">Failed to update category</h4>;
    }
  };

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

export default UpdateCategory;
