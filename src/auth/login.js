import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate, Link } from "react-router-dom";
import "./signup.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // 1️⃣ Login via Supabase Auth
      const { data, error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (loginError) throw loginError;

      const user = data.user;
      if (!user) throw new Error("Login failed — no user returned.");

      // 2️⃣ Fetch role from RLS-enabled 'users' table
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("role")
        .eq("id", user.id)
        .single();

      if (userError) throw userError;

      const role = userData.role;

      // 3️⃣ Redirect based on role
      if (role === "admin") navigate("/admin-home");
      else navigate("/customer-home");
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <h2>Login</h2>

      <form onSubmit={handleLogin} className="signup-form">
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      <p style={{ marginTop: "15px", textAlign: "center" }}>
        Don't have an account?{" "}
        <Link to="/signup" style={{ color: "#AB0000" }}>
          Sign Up
        </Link>
      </p>
    </div>
  );
}
