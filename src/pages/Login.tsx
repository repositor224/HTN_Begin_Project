import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate} from "react-router-dom";
import "./Login.css";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    const success = await login(username, password);
    if (success) navigate("/events");
    else setError("Invalid username or password");
  };

  return (
    <div className="login-page">
      {/* Hack The North Icons that will move from left to right */}
      <div className="hack-icons">
        <img src="/htn-icon1.png" alt="HTN 1" />
        <img src="/htn-icon2.png" alt="HTN 2" />
        <img src="/htn-icon3.png" alt="HTN 3" />
      </div>

      <div className="login-container">
        <h1 className="login-header">Hack The North Login</h1>

        {error && (
          <div className="error-msg">{error}</div>
        )}

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

      </div>
    </div>
  );
}