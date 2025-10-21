import { useState } from "react";
import { supabase } from "../supabaseClient";
import "./signup.css";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // 1️⃣ Sign up via Supabase Auth
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });
      if (signUpError) throw signUpError;

      const user = data?.user;
      if (!user) throw new Error("Signup failed — no user data returned.");

      // 2️⃣ Insert into users table (RLS-enabled)
      const { error: dbError } = await supabase.from("users").insert([
        {
          id: user.id,
          email,
          role,
        },
      ]);
      if (dbError) throw dbError;

      setSuccess("Signup successful! Redirecting...");

      // 3️⃣ Redirect based on role
      setTimeout(() => {
        if (role === "admin") navigate("/admin-home");
        else navigate("/customer-home");
      }, 1000);
    } catch (err) {
      console.error("Signup error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <h2>Create an Account</h2>

      <form onSubmit={handleSignup} className="signup-form">
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password (min. 6 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="customer">Customer</option>
          <option value="admin">Admin</option>
        </select>

        <button type="submit" disabled={loading}>
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>

      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
    </div>
  );
}
