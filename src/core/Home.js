import React from 'react';
import '../styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Base from './Base';

const Home = () => {
  return (
    <Base title="Home Page" description="Welcome to the Tshirt Store">
      <h1 className="text-white">Hello FRONTEND</h1>
    </Base>
  );
};

export default Home;
