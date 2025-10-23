import { useState } from "react";
import { supabase } from "../../supabaseClient";

export default function AddProduct({ onClose }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => setImageFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !price || !imageFile) {
      alert("Please provide name, price, and image.");
      return;
    }

    setLoading(true);
    console.group("🔍 AddProduct Debug");
    try {
      console.log("Step 1 — File selected:", imageFile);

      // Upload file
      const fileExt = imageFile.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      console.log("Uploading file to bucket:", fileName);

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("product-images")
        .upload(fileName, imageFile);

      if (uploadError) throw uploadError;
      console.log("✅ File uploaded:", uploadData);

      // Get public URL
      const { data: urlData } = supabase.storage
        .from("product-images")
        .getPublicUrl(fileName);

      console.log("Public URL:", urlData.publicUrl);

      // Insert product
      const newProduct = {
        name,
        price,
        image_url: urlData.publicUrl,
        category,
        description,
      };
      console.log("Inserting product:", newProduct);

      const { data: insertData, error } = await supabase
        .from("products")
        .insert([newProduct])
        .select();

      if (error) throw error;
      console.log("✅ Product inserted:", insertData);

      alert("Product added successfully!");
      setName("");
      setPrice("");
      setImageFile(null);
      setCategory("");
      setDescription("");
      onClose();
    } catch (err) {
      console.error("❌ Error adding product:", err);
      alert("Error adding product: " + err.message);
    } finally {
      console.groupEnd();
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          width: "300px",
        }}
      >
        <h2>Add Product</h2>
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Product"}
        </button>
        <button
          type="button"
          onClick={onClose}
          style={{ backgroundColor: "#ccc" }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
