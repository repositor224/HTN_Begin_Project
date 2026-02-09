import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Logo1 from "../image/Logo1.png";
import Logo2 from "../image/Logo2.jpg";
import Logo3 from "../image/Logo3.jpg";

export default function Login() {
  const { login, guestLogin } = useAuth(); 
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    const success = await login(username, password);
    if (success) navigate("/events");
    else setError("Invalid username or password");
  };

  const handleGuest = () => {
    guestLogin(); // mark as guest
    navigate("/events");
  };

  return (
    <div className="login-page">
      {/* Hack The North Icons listed*/}
      <div className="hack-icons">
        <img src={Logo1} alt="HTN 1" />
        <img src={Logo2} alt="HTN 2" />
        <img src={Logo3} alt="HTN 3" />
      </div>

      <div className="login-container">
        <h1 className="login-header">Hack The North Login</h1>

        {error && <div className="error-msg">{error}</div>}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="login-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />

        <button className="login-btn" onClick={handleSubmit}>
          Login
        </button>

        <button
          className="guest-btn"
          onClick={handleGuest}
          style={{
            marginTop: "10px",
            backgroundColor: "#f59e0b",
            color: "white",
            borderRadius: "6px",
            padding: "8px 16px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Continue as Guest
        </button>
      </div>
    </div>
  );
}
