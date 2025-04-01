import "../styles/Navbar.css";
import logo from "../assets/health_assets/logo.png";
import { Link } from "react-router-dom";

const logoutFunction = () => {
  localStorage.removeItem("token");
  window.location.reload();
};

const Navbar = () => {
  return (
    <nav className="nav">
      <img src={logo} alt="Logo" className="logo" />
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/calci">Protein Calculator</Link>
        </li>

        <li>
          <Link to="/workout">Workout Plan</Link>
        </li>
        <li>
          <Link to="/updateuser">Update Profile</Link>
        </li>
        <li>
          <a href="http://localhost:8501">Chat-Man</a>
        </li>
        <li>
          <button onClick={logoutFunction}>Logout</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
