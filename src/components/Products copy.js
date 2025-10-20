// import React, { useState, useEffect } from "react";
// import "./Products.css";

// function Products() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Fetch data from Flask backend
//     fetch("http://127.0.0.1:5000/products")
//       .then((response) => response.json())
//       .then((data) => {
//         setProducts(data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching products:", error);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <p>Loading products...</p>;

//   return (
//     <div className="products-container">
//       <h2>Our Products</h2>
//       <div className="product-grid">
//         {products.map((item) => (
//           <div key={item.id} className="product-card">
//             <img src={item.image} alt={item.name} />
//             <h3>{item.name}</h3>
//             <p>${item.price}</p>
//             <button>Add to Cart</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Products;
