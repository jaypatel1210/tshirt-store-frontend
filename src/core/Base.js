import React from 'react';
import Menu from './Menu';

const Base = ({
  title = 'My title',
  description = 'My Description',
  className = 'bg-dark text-white p-4',
  children,
}) => {
  return (
    <div>
      <Menu />
      <div className="container-fluid">
        <div className="jumbotron bg-dark text-white text-center">
          <h2 className="display-4">{title}</h2>
          <p className="lead">{description}</p>
        </div>
        <div className={className}>{children}</div>
      </div>
      <footer className="footer bg-dark">
        <div className="container">
          <h6 className="text-muted text-center">
            An Amazing Place to Buy Tshirt
          </h6>
          <h6 className="text-center">
            <a
              href="https://github.com/jaypatel1210"
              className="text-warning"
              target="_blank"
            >
              &copy; jaypatel1210
            </a>
          </h6>
        </div>
      </footer>
    </div>
  );
};

export default Base;
