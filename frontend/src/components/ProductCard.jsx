import React from "react";
import { Link } from "react-router-dom";
import "../styles/product.css";

const ProductCard = ({ product }) => {
  const imageUrl = Array.isArray(product?.imageUrl)
    ? product.imageUrl[0]
    : product?.imageUrl;

  return (
    <div className="product-card">
      <img
        src={imageUrl || "/logo192.png"}
        alt={product?.name || "Product"}
        className="product-image"
      />
      <div className="product-info">
        <h3 className="product-name">{product?.name}</h3>
        <p className="product-price">
          ${typeof product?.price === "number" ? product.price.toFixed(2) : "0.00"}
        </p>
        <Link to={`/product/${product?._id}`} className="product-link">
          view details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;