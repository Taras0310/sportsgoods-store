import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Api from "../api";
import { useAuth } from "../contexts/AuthContext";

export default function Registration() {
  const { signup, currentUser, admin } = useAuth();

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();
  const nameRef = useRef();
  const passwordConfirmRef = useRef();
  useEffect(() => {
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
      const createdUser = await signup(
        emailRef.current.value,
        passwordRef.current.value
      );
      const user = {
        id: createdUser.user.uid,
        email: createdUser.user.email,
        name: nameRef.current.value,
        photoURL: createdUser.user.photoURL,
      };
      await Api.addUser(user);
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className="page form-page">
      <form autoComplete="off" className="form-group" onSubmit={handleSubmit}>
        <h2 className="form-title">Sign up</h2>
        {error && <div className="error-alert">{error}</div>}
        <div className="field">
          <label htmlFor="email">
            <strong>Email</strong>
          </label>
          <input type="email" className="inp-field" ref={emailRef} required />
        </div>
        <div className="field">
          <label htmlFor="text">
            <strong>Name</strong>
          </label>
          <input type="text" className="inp-field" ref={nameRef} required />
        </div>
        <div className="field">
          <label htmlFor="passowrd">
            <strong>Password</strong>
          </label>
          <input
            type="password"
            className="inp-field"
            ref={passwordRef}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="confirm passowrd">
            <strong>Confirm password</strong>
          </label>
          <input
            type="password"
            className="inp-field"
            ref={passwordConfirmRef}
            required
          />
        </div>
        <span className="have-acc">
          Already have an account? Login
          <Link to="/login"> Here</Link>
        </span>
        <button type="submit" className="btn-primary">
          SUBMIT
        </button>
      </form>
    </div>
  );
}
