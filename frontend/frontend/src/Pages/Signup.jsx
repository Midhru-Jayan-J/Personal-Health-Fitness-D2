import { useState } from "react";
import "../styles/Signup.css";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNo, setPhoneNo] = useState(""); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const userData = {
      username:username,
      firstname:firstName,
      lastname:lastName,
      phone_number:phoneNo,
      email:email,
      gender:gender,
      password:password
    };
    console.log(userData);
    try {
      const response = await fetch("http://localhost:3000/signup", {
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
      console.log("Success:", data);
      // Handle success (e.g., redirect to login page)
    } catch (error) {
      console.error("Error:", error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <div className="signup-container">
      <div className="form-box">
        <h1 className="center-text">Create a new account</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group name-group">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <span className="spacer"></span>
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="text"
              placeholder="Phone Number"
              value={phoneNo}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) {
                  setPhoneNo(value);
                }
              }}
              required
            />
          </div>
          <div className="input-group date">
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <select value={gender} onChange={(e) => setGender(e.target.value)} required>
              <option value="" disabled>
                Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Prefer not to say</option>
            </select>
          </div>
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
          <div className="input-group">
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="signup-button">
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
