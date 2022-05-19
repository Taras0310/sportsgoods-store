import React, { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Header from "../component/Header";

export default function ForgotPassword() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { resetPassword, admin, currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      currentUser.uid === admin ? navigate("/admin") : navigate("/");
    }
  }, [currentUser]);

  const navigate = useNavigate();

  const emailRef = useRef();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage(
        "Перевірте Ваш Email, змініть пароль та перейдіть на сторінку логування!"
      );
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
        <h2>Password Reset</h2>
        {message && <div className="error-alert">{message}</div>}
        <div className="field">
          <label htmlFor="email">
            <strong>Email</strong>
          </label>
          <input
            type="email"
            className="form-control"
            ref={emailRef}
            required
          />
        </div>
        <button type="submit" className="btn">
          Змінити пароль
        </button>
        <span>
          Don't have an account? Signup
          <Link to="/registration"> Here</Link>
        </span>
        <span>
          Already have an account? Login
          <Link to="/login"> Here</Link>
        </span>
      </form>
    </div>
  );
}
