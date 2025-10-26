import { auth } from "@firebase-app/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthProvider = (props) => {
  const [userInfor, setUserInfor] = useState({});
  const value = { userInfor, setUserInfor };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUserInfor(user);
    });
  }, []);
  return <AuthContext.Provider value={value} {...props}></AuthContext.Provider>;
};

export { AuthProvider, AuthContext };
