import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

  const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("Email:", email, "Password:", password);
    };
  
    return (
    <div className="login-container">
      <div className="right-section">
        <div className="login-box">
          <form onSubmit={handleSubmit}>
            <div className="input-group">
            <h1 className="center-text">Log In</h1>
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
          <a href="#" className="forgot-password" onClick={() => navigate("/PasswordRecovery")}>Forgotten password?</a>
          <button className="create-account" onClick={() => navigate("/Signup")}>Create new account</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
