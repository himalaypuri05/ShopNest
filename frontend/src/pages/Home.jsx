import React from "react";
import { Link } from "react-router-dom";
const Home = () => {
    return (
        <div className="home">
            <h1>Welcome to ShopNest</h1>
            <p>your one-step shop for all your naads. Explore our wide range of products and enjoy </p>
            <Link to="/shop" className="btn">Start Shopping</Link>
  </div>
    );
};

export default Home;