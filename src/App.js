import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Products from "./components/Products";
import Pets from "./components/Pets";
import Signup from "./auth/signup";
import Login from "./auth/login";
import AdminHome from "./pages/AdminHome";       // if file is AdminHome.js
import CustomerHome from "./pages/CustomerHome"; // if file is CustomerHome.js


function Home() {
  return <h2>Welcome to Petify 🐾</h2>;
}

function Contact() {
  return <h2>Contact Us 📞</h2>;
}

function App() {
  return (
    <Router>
      <nav style={{ display: "flex", gap: "15px" }}>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/pets">Pets</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/login">Log In</Link>
        <Link to="/signup">Sign Up</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/pets" element={<Pets />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin-home" element={<AdminHome />} />
        <Route path="/customer-home" element={<CustomerHome />} />
      </Routes>
    </Router>
  );
}

export default App;
