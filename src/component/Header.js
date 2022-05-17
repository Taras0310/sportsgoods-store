import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../contexts/AppContext";
import { useAuth } from "../contexts/AuthContext";
import Home from "../pages/Home";
import "./header.scss";
export default function Header() {
  const { clearFilter } = useStore();
  const { currentUser, logout, admin } = useAuth();
  const [error, setError] = useState("");

  async function handleLogout() {
    setError("");

    try {
      await logout();
    } catch {
      setError("Failed to log out!");
    }
  }

  return (
    <div className="top">
      <div className="leftpart"></div>
      <div className="rightpart">
        <div className="list-item">
          <ul>
            {!currentUser ? (
              <>
                <Link to="/" element={<Home />} onClick={clearFilter}>
                  Back home
                </Link>
                <Link to="/registration" className="navlinks">
                  {" "}
                  <li>Реєстрація</li>
                </Link>
                <Link to="/login" className="navlinks">
                  <li>Вхід</li>
                </Link>
              </>
            ) : currentUser.uid === admin ? (
              <>
                <Link to="/" element={<Home />} onClick={clearFilter}>
                  Back home
                </Link>
                <Link to="/" className="navlinks">
                  <li onClick={handleLogout}>Вихід</li>
                </Link>
              </>
            ) : (
              <>
                <Link to="/" element={<Home />} onClick={clearFilter}>
                  Back home
                </Link>
                <Link to="/profile" className="navlinks">
                  {" "}
                  <li>Кабінет</li>
                </Link>
                <Link to="/" className="navlinks">
                  <li onClick={handleLogout}>Вихід</li>
                </Link>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
