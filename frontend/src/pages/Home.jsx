import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from '../components/ProductCard';
import { apiUrl } from '../utils/api';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(apiUrl('/api/products'));
        const data = await res.json();
        if (Array.isArray(data)) {
          setProducts(data.slice(0, 4)); // Featured products
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  
  return (
    <div className="home-container">
    <div className= "hero-banner">
      <h1>Welcome to ShopNest</h1>
      <p>Discover the best products at unbeatable</p>
      <Link to="/shop" className="btn">Start Shopping</Link>
    </div>

    <h2>Featured Products</h2>
    { loading ? (
      <div>Loading...</div>
    ) : (
      <div className="products-grid">
        {products.map((products) => (
          <ProductCard key={products._id} product={products} />
        ))}
        </div>      
    )}
    </div>
  );
};

export default Home;