import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { signin, authenticate, isAuthenticated } from '../auth/helper';
import Base from '../core/Base';

const Signin = () => {
  const [values, setValues] = useState({
    email: 'a@gmail.com',
    password: '12345678',
    err: '',
    loading: false,
    didRedirect: false,
  });

  const { email, password, err, loading, didRedirect } = values;
  const { user } = isAuthenticated();

  const handleChange = name => event => {
    setValues({ ...values, err: false, [name]: event.target.value });
  };

  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, err: false, loading: true });
    signin({ email, password })
      .then(data => {
        if (data.err) setValues({ ...values, err: data.err, loading: false });
        else
          authenticate(data, () => {
            setValues({ ...values, didRedirect: true });
          });
      })
      .catch(console.log('signin request failed'));
  };

  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role === 1) return <Redirect to="/admin/dashboard" />;
      else return <Redirect to="/user/dashboard" />;
    }
    if (isAuthenticated()) return <Redirect to="/" />;
  };

  const loadingMessage = () =>
    loading && (
      <div className="alert alert-info">
        <h2>Loading....</h2>
      </div>
    );
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

  const signInForm = () => {
    return (
      <div className="row">
        <div className="col-md-4 offset-sm-4 text-left">
          {loadingMessage()}
          {errorMessage()}
          <form>
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
  return (
    <Base title="Sign In Page" description="A page for user to Sign In!">
      {signInForm()}
      {performRedirect()}
      <p className="text-center">{JSON.stringify(values)}</p>
    </Base>
  );
};

export default Signin;
