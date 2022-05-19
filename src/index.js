import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppProvider from "./contexts/AppContext";
import App from "./App";
import "./index.scss";
import AuthProvider from "./contexts/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>
);
