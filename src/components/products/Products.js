import React, { useState, useEffect } from "react";
import "./Products.css";
import { supabase } from "../../supabaseClient";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data: productsData, error } = await supabase
          .from("products")
          .select("*");

        if (error) {
          console.error("Error fetching products:", error);
          return;
        }

        console.log("Fetched products:", productsData);

        // For each product, check if its image is from Supabase Storage
        const updatedProducts = await Promise.all(
          productsData.map(async (item) => {
            // Check if it's a Supabase storage URL
            if (
              item.image_url &&
              item.image_url.includes("supabase.co/storage/v1/object/")
            ) {
              try {
                // Extract the file path from the public URL
                const pathMatch = item.image_url.match(
                  /product-images\/(.*)$/
                );
                const filePath = pathMatch ? pathMatch[1] : null;

                if (!filePath) return item;

                // Try to create a signed URL (for private buckets)
                const { data: signedUrlData, error: urlError } =
                  await supabase.storage
                    .from("product-images")
                    .createSignedUrl(filePath, 60 * 60); // valid for 1 hour

                if (urlError) {
                  console.warn("Signed URL error:", urlError.message);
                  return item;
                }

                return { ...item, signedImageUrl: signedUrlData.signedUrl };
              } catch (err) {
                console.error("Error generating signed URL:", err);
                return item;
              }
            }
            // For external images or already public URLs
            return item;
          })
        );

        setProducts(updatedProducts);
      } catch (err) {
        console.error("Unexpected error fetching products:", err);
      } finally {
        setLoading(false);
      }
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
            <img
              src={item.signedImageUrl || item.image_url}
              alt={item.name}
              onError={(e) => {
                e.target.src = "/fallback.jpg"; // optional fallback
              }}
            />
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
