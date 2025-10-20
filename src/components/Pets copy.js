// import React, { useEffect, useState } from "react";

// function Pets() {
//   const [pets, setPets] = useState([]);

//   useEffect(() => {
//     fetch("http://127.0.0.1:5000/pets")
//       .then((res) => res.json())
//       .then((data) => setPets(data))
//       .catch((err) => console.error("Error fetching pets:", err));
//   }, []);

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Available Pets 🐕</h2>
//       <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
//         {pets.map((pet) => (
//           <div
//             key={pet.id}
//             style={{
//               border: "1px solid #ccc",
//               borderRadius: "10px",
//               padding: "15px",
//               width: "150px",
//               textAlign: "center",
//             }}
//           >
//             <h4>{pet.name}</h4>
//             <p>Type: {pet.type}</p>
//             <p>Age: {pet.age}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Pets;
