import { useState } from "react";

const UpdateUser = () => {
  const [username, setUsername] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [phone_number, setPhoneNo] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [message, setMessage] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ username, firstname, lastname, phone_number, email, password, oldPassword })
      });
      const data = await response.json();
      if(response.status !== 200) {
        return setMessage(data.error || "An error occurred");
      }
      setMessage(data.message || "Profile updated successfully!");
    } catch (error) {
      setMessage("An error occurred");
        console.error("Error:", error);
    }
  };

  return (
    <div className="signup-container">
      <div className="form-box">
        <h1 className="center-text">Update Profile</h1>
        {message && <p className="text-red-500">{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group name-group">
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}  />
            <input type="text" placeholder="First Name" value={firstname} onChange={(e) => setFirstName(e.target.value)}  />
            <span className="spacer"></span>
            <input type="text" placeholder="Last Name" value={lastname} onChange={(e) => setLastName(e.target.value)}  />
          </div>
          <div className="input-group">
            <input type="text" placeholder="Phone Number" value={phone_number} onChange={(e) => { if (/^\d*$/.test(e.target.value)) setPhoneNo(e.target.value); }}  />
          </div>
          <div className="input-group">
            <select value={gender} onChange={(e) => setGender(e.target.value)} >
              <option value="nochange" disabled>Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Prefer not to say</option>
            </select>
          </div>
          <div className="input-group">
            <input type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)}  />
          </div>
          <div className="input-group">
            <input type="password" placeholder="Old Password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} required />
          </div>
          <div className="input-group">
            <input type="password" placeholder="New Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit" className="signup-button">Update</button>
        </form>

      </div>
    </div>
  );
};

export default UpdateUser;
