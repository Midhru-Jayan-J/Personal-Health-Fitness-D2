import { useState } from "react";
import "../styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);
  };

  return (
    <div className="login-container">
      <div className="left-section">
        <h1 className="welcome-text">Welcome to our App</h1>
        <p className="description">A ultimate personal health and fitness tracker! Stay motivated, track your progress, and achieve your fitness goals with ease.</p>
      </div>
      <div className="right-section">
        <div className="login-box">
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="email"
                placeholder="Email address or phone number"
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
            <button type="submit" className="login-button">Log in</button>
          </form>
          <a href="#" className="forgot-password">Forgotten password?</a>
          <button className="create-account">Create new account</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
