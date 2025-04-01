import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useEffect } from "react";
import Home from "./Pages/Home"; // Ensure the correct path
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
// import PasswordRecovery from "./Pages/PasswordRecovery";
import { useAuthStore } from "./store/useAuthStore";
import UpdateUser from "./Pages/UpdateUser";
import Recommendation from "./Pages/Recommendation";
import ProteinCalculator from "./Pages/ProteinCalculator";
// import Loader from "./components/Loader"; // Ensure the correct path to the Loader component

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return isCheckingAuth ? (
    <p>Loading...</p>
  ) : (
    <Router>
      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!authUser ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <Signup /> : <Navigate to="/" />}
        />
        <Route
          path="/updateuser"
          element={authUser ? <UpdateUser /> : <Navigate to="/login" />}
        />
        <Route
          path="/calci"
          element={authUser ? <ProteinCalculator /> : <Navigate to="/login" />}
        />
        <Route
          path="/workout"
          element={authUser ? <Recommendation /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
