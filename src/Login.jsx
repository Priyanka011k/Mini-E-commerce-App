
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Fake credentials
    if (email === "user@example.com" && password === "test@789") {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/shop");
    } else {
      alert("Invalid credentials. Try user@example.com / test@789");
    }
  };

  return (
    <div className="login-container">
      <h2>Login to LuxuryCart</h2>
      <form onSubmit={handleLogin} className="login-form">
        <input
          type="email"
          placeholder="Email"
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
