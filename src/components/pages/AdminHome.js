import { useState } from "react";
import AddProduct from "../admin/add_products";

export default function AdminHome() {
  const [showAddProduct, setShowAddProduct] = useState(false);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Welcome Admin 🐾</h1>
      <p>
        This is your admin dashboard. You can manage pets, products, and users
        here.
      </p>

      <button
        onClick={() => setShowAddProduct(true)}
        style={{
          padding: "10px 20px",
          backgroundColor: "#AB0000",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginTop: "20px",
        }}
      >
        Add Product
      </button>

      {showAddProduct && (
        <AddProduct onClose={() => setShowAddProduct(false)} />
      )}
    </div>
  );
}
