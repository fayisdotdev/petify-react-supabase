import React, { useState, useEffect } from "react";
import "./Products.css";
import { supabase } from '../supabaseClient';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from("products").select("*");
      if (error) {
        console.error("Error fetching products:", error);
      } else {
        setProducts(data);
      }
      setLoading(false);
    };
    fetchProducts();
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (!products.length) return <p>No products available.</p>;

  return (
    <div className="products-container">
      <h2>Our Products</h2>
      <div className="product-grid">
        {products.map((item) => (
          <div key={item.id} className="product-card">
            <img src={item.image_url} alt={item.name} />
            <h3>{item.name}</h3>
            <p>${item.price}</p>
            <button>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
