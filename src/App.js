import React from "react";
import { Routes, Route, useLocation, Outlet, Navigate } from "react-router-dom";
import AuthProvider, { useAuth } from "./contexts/AuthContext";

import Home from "./pages/Home";
import Products from "./pages/Products";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import AdminPage from "./pages/AdminPage";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import UpdateProfile from "./pages/UpdateProfile";

import "./App.css";

const PrivateRoutes = () => {
  const { currentUser, admin } = useAuth();
  const location = useLocation();
  return currentUser.uid === admin ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/update" element={<UpdateProfile />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/admin" element={<AdminPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
