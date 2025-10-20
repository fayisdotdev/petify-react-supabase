import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Products from "./components/Products";

function Home() {
  return <h2>Welcome to Petify 🐾</h2>;
}

function App() {
  return (
    <Router>
      <nav style={{ display: "flex", gap: "15px" }}>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </Router>
  );
}

export default App;
