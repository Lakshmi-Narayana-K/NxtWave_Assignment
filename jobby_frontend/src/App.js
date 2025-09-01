import "./App.css";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import LoginPage from "./pages/login";
import HomePage from "./pages/home";
import Header from "./components/Header";
import JobPage from "./pages/job";
import ProtectedRoute from "./components/ProtectRoute";
import { useEffect, useState } from "react";
import JobDetailPage from "./pages/jobDetail";

function App() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("jwt_token");
    if (pathname === "/login") {
      setIsLoggedIn(false);
    } else {
      if (token) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        navigate("/login", { replace: true });
      }
    }
  }, [pathname, navigate]);

  return (
    <div className="App">
      <Header isLoggedIn={isLoggedIn} />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/jobs"
          element={
            <ProtectedRoute>
              <JobPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/jobs/:id"
          element={
            <ProtectedRoute>
              <JobDetailPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
