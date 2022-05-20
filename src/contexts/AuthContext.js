import React, { useState, useEffect, useContext } from "react";
import { auth } from "../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthContext = React.createContext();

export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const admin = "YxVxRpDM5uW8lmxd7lLfrrKYeSW2";
  // kdtS4BlwMNVTQJa2NWtd4CZf1Av1

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function updateUserProfile(user, displayName) {
    updateProfile(user, { displayName: displayName });
  }
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  function logout() {
    return signOut(auth);
  }

  function updateEmail(user, email) {
    updateEmail(user, { email });
  }

  function updatePassword(user, password) {
    updatePassword(user, { password });
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    admin,
    signup,
    login,
    logout,
    updateUserProfile,
    resetPassword,
    updateEmail,
    updatePassword,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
