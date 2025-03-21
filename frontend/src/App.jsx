import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import Home from "./Pages/Home"; // Ensure the correct path
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import PasswordRecovery from "./Pages/PasswordRecovery";
import { useAuthStore } from "./store/useAuthStore";
import UpdateUser from "./Pages/UpdateUser";
// import Loader from "./components/Loader"; // Ensure the correct path to the Loader component

function App() {

  const {authUser, checkAuth} = useAuthStore();
  useEffect(() => {
    checkAuth()
  }, [checkAuth])



  return (
    <Router>
      <Routes>
        <Route path="/" element={authUser?<Home />: <Navigate to='/login' />} />
        <Route path="/login" element={!authUser?<Login />:<Navigate to='/' />} />
        <Route path="/signup" element={!authUser?<Signup />:<Navigate to='/' />} />
        <Route path="/password-recovery" element={<PasswordRecovery />} />
        <Route path="/update-user" element = {!authUser?<UpdateUser/>:<Navigate to='/login' />} />
      </Routes>
    </Router>
  );
}

export default App;

