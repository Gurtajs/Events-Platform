import React, { createContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {firebaseConfig} from "../src/firebase.js"
import { getAuth } from "firebase/auth";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export type ContextType = {
  email: string,
  setEmail: React.Dispatch<React.SetStateAction<string>>,
  password: string,
  setPassword: React.Dispatch<React.SetStateAction<string>>,
  auth: any
}

const AuthContext = createContext<ContextType>({
  email: '',
  setEmail: () => {},
  password: '',
  setPassword: () => {},
  auth: null,
})

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [email, setEmail] = useState(() => localStorage.getItem("email") || "");
  const [password, setPassword] = useState<string>('')
  useEffect(() => {
    if (email) {
      localStorage.setItem("email", email);
    } else {
      localStorage.removeItem("email");
    }
  }, [email]);
  return (
    <AuthContext.Provider value={{email, setEmail, password, setPassword, auth}}>
      {children}
    </AuthContext.Provider>
  )
}

export {AuthContext, AuthProvider}