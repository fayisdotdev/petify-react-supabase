import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import "./Pets.css";

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
    <div className="pets">
      <h2>Available Pets 🐕</h2>
      <div className="pet-grid">
        {pets.map((pet) => (
          <div className="pet-card" key={pet.id}>
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
