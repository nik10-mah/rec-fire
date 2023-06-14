import React, { useContext, useEffect, useState } from "react";
import { auth, googleProvider } from "../firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
const AuthContext = React.createContext();

/**
 * Creating useAuth hook to get auth context access
 * @returns 
 */
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState();

  /**
   * Basic Auth Sign in using email/password
   * @param {string} email 
   * @param {string} password 
   * @returns firebase sign in method
   */
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  /**
   * Logs out user from application and clar all oauth credentials
   * @returns signout function
   */
  const logout = () => {
    return signOut(auth);
  };

  /**
   * Create a user with an email and password
   * @param {string} email 
   * @param {string} password 
   * @returns create user function
   */
  const register = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  /**
   * Logs in user bu opening an google sign in pop up
   * @returns google sign in function
   */
  const googleSignIn = () => {
    return signInWithPopup(auth, googleProvider);
  };

  useEffect(() => {
    /**
     * whenevr the authenticaton state is chnage th current user is set inot state and then used in the dashbaord using useAuth context
     */
    onAuthStateChanged(auth, (user) => {
      console.log(' auth state chnaged', user);
      setCurrentUser(user);
      setLoading(false);
    });
  }, []);

  const value = {
    login,
    logout,
    register,
    currentUser,
    googleSignIn
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
