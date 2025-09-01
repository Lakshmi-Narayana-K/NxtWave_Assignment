import "./App.css";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import LoginPage from "./pages/login";
import HomePage from "./pages/home";
import Header from "./components/Header";
import JobPage from "./pages/job";
import ProtectedRoute from "./components/ProtectRoute";
import { useEffect, useState } from "react";
import JobDetailPage from "./pages/jobDetail";
import NotFoundPage from "./pages/notfound";
import { Navigate } from "react-router-dom";

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

  const validRoutes = ["/", "/jobs", `/jobs/${pathname.split("/")[2]}`];
  const shouldShowHeader = validRoutes.includes(pathname);

  return (
    <div className="App">
      {shouldShowHeader && <Header isLoggedIn={isLoggedIn} />}
      <Routes>
        <Route
          path="/login"
          element={
            localStorage.getItem("jwt_token") ? (
              <Navigate to="/" replace />
            ) : (
              <LoginPage />
            )
          }
        />
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
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
