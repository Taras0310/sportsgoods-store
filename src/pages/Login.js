import React, { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Header from "../component/Header";

export default function Login() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { currentUser, login, admin } = useAuth();

  useEffect(() => {
    if (currentUser) {
      currentUser.uid === admin ? navigate("/admin") : navigate("/");
    }
  }, [currentUser]);

  const navigate = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }

  return (
    <div className="log">
      <Header />
      <form autoComplete="off" className="form-group" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <div className="error-alert">{error}</div>}
        <div className="field">
          <label htmlFor="email">
            <strong>Email</strong>
          </label>
          <input type="email" ref={emailRef} required />
        </div>
        <div className="field">
          <label htmlFor="passowrd">
            <strong>Password</strong>
          </label>
          <input type="password" ref={passwordRef} required />
        </div>
        <button type="submit" className="btn">
          Login
        </button>
        <span>
          Don't have an account? Signup
          <Link to="/registration"> Here</Link>
        </span>
        <span>
          Forgot Password? Click
          <Link to="/forgotpassword"> Here</Link>
        </span>
      </form>
    </div>
  );
}
