import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../contexts/AppContext";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import AdminPage from "../pages/AdminPage";
import Home from "../pages/Home";

export default function Header() {
  const { clearFilter } = useStore();
  const { currentUser, logout, admin } = useAuth();
  const { setOpenCart, setCartProducts } = useCart();

  async function handleLogout() {
    try {
      setCartProducts([]);
      await logout();
    } catch {
      alert("Failed to log out!");
    }
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
            <Link to="/contact" className="navlinks">
              <span>Контакти</span>
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
            <Link to="/admin" element={<AdminPage />} onClick={clearFilter}>
              <span>Адмін панель</span>
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
            <Link to="/contact" className="navlinks">
              <span>Контакти</span>
            </Link>
            <Link to="/profile" className="navlinks">
              {" "}
              <span>Кабінет</span>
            </Link>
            <a className="navlinks" onClick={() => setOpenCart(true)}>
              <span>Кошик</span>
            </a>
            <Link to="/" className="navlinks">
              <span onClick={handleLogout}>Вихід</span>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
