import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../contexts/AppContext";
import { useAuth } from "../contexts/AuthContext";
import Home from "../pages/Home";

export default function Header() {
  const { clearFilter } = useStore();
  const { currentUser, logout, admin } = useAuth();
  const [error, setError] = useState("");

  async function handleLogout() {
    setError("");

    // try {
    //   await logout();
    // } catch {
    //   setError("Failed to log out!");
    // }
  }

  return (
    <header>
      <div className="logo">sports-goods</div>
      <div className="menu">
        {!currentUser ? (
          <>
            <Link to="/" element={<Home />} onClick={clearFilter}>
              <span>Головна</span>
            </Link>
            <Link to="/registration" className="navlinks">
              <span>Реєстрація</span>
            </Link>
            <Link to="/login" className="navlinks">
              <span>Вхід</span>
            </Link>
          </>
        ) : currentUser.uid === admin ? (
          <>
            <Link to="/" element={<Home />} onClick={clearFilter}>
              <span>Головна</span>
            </Link>
            <Link to="/" className="navlinks">
              <span onClick={handleLogout}>Вихід</span>
            </Link>
          </>
        ) : (
          <>
            <Link to="/" element={<Home />} onClick={clearFilter}>
              <span>Головна</span>
            </Link>
            <Link to="/profile" className="navlinks">
              {" "}
              <span>Кабінет</span>
            </Link>
            <Link to="/" className="navlinks">
              <span onClick={handleLogout}>Вихід</span>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
