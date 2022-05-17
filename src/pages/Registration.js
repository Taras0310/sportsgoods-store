import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "../component/registration.scss";

export default function Registration() {
  const { signup, currentUser, admin } = useAuth();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();
  const nameRef = useRef();
  const passwordConfirmRef = useRef();
  useEffect(() => {
    console.log(currentUser, "currentUser");
    if (currentUser) {
      currentUser.uid === admin ? navigate("/admin") : navigate("/");
    }
  }, [currentUser]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Паролі не співпадають!");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }

  return (
    <div className="sign">
      <form autoComplete="off" className="form-group" onSubmit={handleSubmit}>
        <h2>Sign up</h2>
        {error && <div className="error-alert">{error}</div>}
        <div className="field">
          <label htmlFor="email">
            <strong>Email</strong>
          </label>
          <input type="email" ref={emailRef} required />
        </div>
        <div className="field">
          <label htmlFor="text">
            <strong>Name</strong>
          </label>
          <input type="text" ref={nameRef} required />
        </div>
        <div className="field">
          <label htmlFor="passowrd">
            <strong>Password</strong>
          </label>
          <input type="password" ref={passwordRef} required />
        </div>
        <div className="field">
          <label htmlFor="confirm passowrd">
            <strong>Confirm password</strong>
          </label>
          <input type="password" ref={passwordConfirmRef} required />
        </div>
        <button type="submit" className="btn">
          SUBMIT
        </button>
        <span>
          Already have an account? Login
          <Link to="/login"> Here</Link>
        </span>
      </form>
    </div>
  );
}
