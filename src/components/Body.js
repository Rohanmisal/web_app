import React, { useEffect, useState } from "react";
import Login from "./Login.js";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { userInputs } from "./formSource";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase.js";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice.js";
import Home from "./Home.js";
import List from "./users/list/List.jsx";
import New from "./users/new/New.jsx";
import Edit from "./users/new/Edit.jsx";

const Body = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        setUsername(user);
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
      } else {
        // User is signed out
        dispatch(removeUser());
        setUsername(null);
      }
    });
  }, [username]);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={username !== null ? <Home /> : <Login />} />
          <Route
            path="/users/*"
            element={
              username !== null ? (
                <Routes>
                  <Route index element={<List />} />
                  {/* <Route path=":userId" element={<Single />} /> */}
                  <Route
                    path="edit/:userId"
                    element={<Edit inputs={userInputs} title="Edit User" />}
                  />
                  <Route
                    path="new"
                    element={<New inputs={userInputs} title="Add New User" />}
                  />
                </Routes>
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Body;
