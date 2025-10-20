import React, { useEffect, useState } from "react";
import { supabase } from '../supabaseClient';

function Pets() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPets = async () => {
      const { data, error } = await supabase.from("pets").select("*");
      if (error) {
        console.error("Error fetching pets:", error);
      } else {
        setPets(data);
      }
      setLoading(false);
    };
    fetchPets();
  }, []);

  if (loading) return <p>Loading pets...</p>;
  if (!pets.length) return <p>No pets available.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Available Pets 🐕</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
        {pets.map((pet) => (
          <div
            key={pet.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "15px",
              width: "150px",
              textAlign: "center",
            }}
          >
            <h4>{pet.name}</h4>
            <p>Type: {pet.type}</p>
            <p>Age: {pet.age}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Pets;
