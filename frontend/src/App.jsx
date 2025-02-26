import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login"; // Update path based on your folder structure
import Signup from "./Pages/Signup";
import PasswordRecovery from "./Pages/PasswordRecovery";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/PasswordRecovery" element={<PasswordRecovery />} />
      </Routes>
    </Router>
  );
}

export default App;
