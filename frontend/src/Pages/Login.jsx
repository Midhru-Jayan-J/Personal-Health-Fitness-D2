import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // Step 1: Login, Step 2: OTP

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
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("Success:", data.message);
      setStep(2); // Move to OTP step
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // OTP verification handler
  const handleOtpVerify = async (e) => {
    e.preventDefault();
    const otpData = { email, otp };
    try {
      const response = await fetch("http://localhost:3000/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(otpData),
      });

      if (!response.ok) {
        throw new Error("Invalid OTP");
      }
      const data = await response.json();
      console.log("OTP Verified:", data.message);
      localStorage.setItem("token", data.token);
      navigate("/Home"); // Redirect to dashboard or home
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="login-container">
      <div className="right-section">
        <div className="login-box">
          {step === 1 ? (
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
                Send OTP
              </button>
            </form>
          ) : (
            <form onSubmit={handleOtpVerify}>
              <h1 className="center-text">Enter OTP</h1>
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="login-button">
                Verify OTP
              </button>
            </form>
          )}
          <a href="#" className="forgot-password" onClick={() => navigate("/PasswordRecovery")}>
            Forgotten password?
          </a>
          <button className="create-account" onClick={() => navigate("/Signup")}>
            Create new account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
