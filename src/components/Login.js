import { useRef, useState } from "react";
import validate from "../utils/validate.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase.js";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser} from "../utils/userSlice.js"


const Login = () => {
  const [issignin, setIsSignin] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    const message = validate(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message) return;

    if (!issignin) {
      // Sign up logic

      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png",
          }).then(() => {
            const {uid, email, displayName, photoURL} = auth.currentUser;
            dispatch( 
              addUser({
              uid: uid,
              email: email,
              displayName: displayName,
              photoURL: photoURL,
            })
            )
            // Profile updated!
            navigate('/');
          }).catch((error) => {
            // An error occurred
            setErrorMessage(error.message)
          });
          console.log(user);
          navigate("/")
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      // Sign In logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          navigate("/")
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };

  const toggleSignInForm = () => {
    setIsSignin(!issignin);
  };

  return (
    <div>
     
      
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80"
      >
        <h1 className="font-bold text-3xl py-4 ">
          {issignin ? "Sign In" : "Sign Up"}
        </h1>
        {!issignin && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-4 my-2 w-full bg-gray-700"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="p-4 my-2 w-full bg-gray-700"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-4 my-2 w-full bg-gray-700"
        />
        <p className="text-red-500 font-bold text-lg py-2 ">{errorMessage}</p>

        <button
          className="p-4 my-6 bg-red-700 w-full rounded-lg"
          onClick={handleButtonClick}
        >
          {issignin ? "Sign In" : "Sign Up"}
        </button>
        <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
          {issignin
            ? "New to Here? Sign up now"
            : "Already register? Sign In Now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
