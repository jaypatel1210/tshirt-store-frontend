import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { signup } from '../auth/helper';
import Base from '../core/Base';

const Signup = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    err: '',
    success: false,
  });

  const { name, email, password, err, success } = values;

  const handleChange = name => event => {
    setValues({ ...values, err: false, [name]: event.target.value });
  };

  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, err: false });
    signup({ name, email, password })
      .then(data => {
        if (data.err) setValues({ ...values, err: data.err, success: false });
        else
          setValues({
            ...values,
            name: '',
            email: '',
            password: '',
            err: '',
            success: true,
          });
      })
      .catch(console.log('Error in Signup'));
  };

  const signUpForm = () => {
    return (
      <div className="row">
        <div className="col-md-4 offset-sm-4 text-left">
          {successMessage()}
          {errorMessage()}
          <form>
            <div className="form-group">
              <label htmlFor="name" className="text-light">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="form-control"
                onChange={handleChange('name')}
                value={name}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="text-light">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="form-control"
                onChange={handleChange('email')}
                value={email}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="text-light">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="form-control"
                onChange={handleChange('password')}
                value={password}
              />
            </div>
            <button onClick={onSubmit} className="btn btn-success btn-block">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };

  const successMessage = () => {
    return (
      <div
        className="alert alert-success"
        style={{ display: success ? '' : 'none' }}
      >
        User Signed up SuccessFully <Link to="/signin">Login Here</Link>
      </div>
    );
  };
  const errorMessage = () => {
    return (
      <div
        className="alert alert-danger"
        style={{ display: err ? '' : 'none' }}
      >
        {err}
      </div>
    );
  };

  return (
    <Base title="Sign up Page" description="A page for user to Sign up!">
      {signUpForm()}
      {/* <p className="text-center text-white">{JSON.stringify(values)}</p> */}
    </Base>
  );
};

export default Signup;
