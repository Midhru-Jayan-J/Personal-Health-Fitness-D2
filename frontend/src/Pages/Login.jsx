import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Login submit handler
  const handleLogin = async (e) => {
    e.preventDefault();
    const userData = { email, password };
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        console.log("Not Authenticated");
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="login-container">
      <div className="right-section">
        <div className="login-box">
          <form onSubmit={handleLogin}>
            <h1 className="center-text">Log In</h1>
            <div className="input-group">
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
          </form>

          <button
            className="create-account"
            onClick={() => navigate("/Signup")}
          >
            Create new account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
