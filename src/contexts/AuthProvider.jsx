import { auth, db } from "@firebase-app/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthProvider = (props) => {
  const [userInfor, setUserInfor] = useState({});
  const value = { userInfor, setUserInfor };
  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     setUserInfor(user);
  //   });
  // }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const docRef = query(
          collection(db, "users"),
          where("email", "==", user.email)
        );
        onSnapshot(docRef, (snapshot) => {
          snapshot.forEach((doc) => {
            setUserInfor({
              ...user,
              ...doc.data(),
            });
          });
        });
        // setUserInfor(user);
      } else {
        setUserInfor(null);
      }
    });
  }, []);
  return <AuthContext.Provider value={value} {...props}></AuthContext.Provider>;
};

export { AuthProvider, AuthContext };
