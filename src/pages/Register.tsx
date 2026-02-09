//Defunct Page: Removed due to Vercel issues
/*import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/db";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // success or error message
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    setMessage(""); 
    setMessageType("");

    const result = await registerUser(username, password);

    if (result.success) {
      setMessage("Registration successful! Redirecting to login...");
      setMessageType("success");

     
      setTimeout(() => navigate("/login"), 2000); //Waits for 2 second, and then go back to the main login page
    } else {
      setMessage("Sorry, this username is already taken");
      setMessageType("error");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1 className="login-header">Register</h1>

        <div className="login-inputs">
          <input
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
        </div>

        <div className="login-buttons">
          <button className="login-btn" onClick={handleRegister}>
            Register
          </button>
          <button
            className="login-return-btn"
            onClick={() => navigate("/login")}
          >
            Return to Login
          </button>
        </div>

        {message && (
          <p
            className={
              messageType === "success" ? "login-success" : "login-error"
            }
            style={{ marginTop: 12 }}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
*/