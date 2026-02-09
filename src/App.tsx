import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import Login from "./pages/Login";
import { useAuth } from "./auth/AuthContext";
import "./App.css"; // global styles

export default function App() {
  const { isLoggedIn } = useAuth();

  return (
    <div className="app-container">
      <BrowserRouter>
        <Routes>
          {/* Start at login, redirect if already logged in */}
          <Route
            path="/"
            element={isLoggedIn ? <Navigate to="/events" /> : <Login />}
          />

          {/* Protect events */}
          <Route
            path="/events"
            element={isLoggedIn ? <Events /> : <Navigate to="/login" />}
          />
          <Route
            path="/events/:id"
            element={isLoggedIn ? <EventDetail /> : <Navigate to="/login" />}
          />

          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
