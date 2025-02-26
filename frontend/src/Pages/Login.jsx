import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

  const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const userData =  {
        email:email,
        password:password
      };
      try {
        const response = await fetch ("http://localhost:3000/login", {
          method: "GET",
          headers: {
            "Content-Type" : "application/json",
          },
          body: JSON.stringify(userData),
        });

        if  (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log("Success : ",data);
      } catch (error) {
        console.error("Error:",error);
      }
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
            <button type="submit" className="login-button" >Login</button>
          </form>
          <a href="#" className="forgot-password" onClick={() => navigate("/PasswordRecovery")}>Forgotten password?</a>
          <button className="create-account" onClick={() => navigate("/Signup")}>Create new account</button>
        </div>
      </div>
    </div>
  );
};

export default Login;