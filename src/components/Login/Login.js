import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import firebaseConfig from './firebase.config';
import { GoogleAuthProvider } from "firebase/auth";
import {signInWithPopup} from "firebase/auth";
import { useState } from 'react';
import { signOut } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { updateProfile } from "firebase/auth";
import { FacebookAuthProvider } from "firebase/auth";
import { useContext } from "react";
import { UserContext } from "../../App";
import { useLocation, useNavigate } from "react-router-dom";



const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


function Login() {

  const provider = new GoogleAuthProvider();
  const fbProvider = new FacebookAuthProvider();

  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photo: '',
    error: '',
    success: '',    
  })
  const signInClickHandler = () => {
    signInWithPopup(auth, provider).then(result => {
      const {displayName, email, photoURL} = result.user;

      const signedInUser ={
        isSignedIn: true,
        name: displayName,
        email: email,
        password: '',
        photo: photoURL,
        error: '',
        success: '',
      }
        setUser(signedInUser);
      console.log(displayName, email, photoURL);
      console.log(result);
    })
    .catch(error=>{
      console.log(error.code);
      console.log(error.message);
    })
  }

  const signOutClickHandler=()=>{
    signOut(auth).then((result) => {
      const signedOutUser ={
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        photo: '',
        error: '',
        success: '',
      }
        setUser(signedOutUser);
    }).catch((error) => {
      // An error happened.
    });
  }

// SIGN IN WITH FACEBOOK-----------------------------------

    const fbSignInClickHandler = () =>{
      const auth = getAuth();
        signInWithPopup(auth, fbProvider)
          .then((result) => {
            // The signed-in user info.
            const user = result.user;
            console.log(user);
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            const credential = FacebookAuthProvider.credentialFromResult(result);
            const accessToken = credential.accessToken;

            // ...
            
          })
          .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = FacebookAuthProvider.credentialFromError(error);

            // ...
          });
    }

const [loggedInUser, setLoggedInUser] = useContext(UserContext);


// SIGN IN WITH EMAIL AND PASSWORD CUSTOM----------------------

let navigate = useNavigate();
  let location = useLocation();

  let from = location.state?.from?.pathname || "/";

  const handleSubmit = (e) => {
    if(newUser && user.email && user.password){
          const auth = getAuth();
            createUserWithEmailAndPassword(auth, user.email, user.password)
              .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                const newUserInfo = {...user};
                  newUserInfo.error = '';
                  newUserInfo.success = true;
                    setUser(newUserInfo);
                    updateUserName(user.name);
                    
                  
              })
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                  console.log(errorCode, errorMessage);
                  const newUserInfo = {...user};
                    newUserInfo.error = errorMessage;
                    newUserInfo.success = false;
                      setUser(newUserInfo);

            });
    }


    if(!newUser && user.email && user.password){
        const auth = getAuth();
        signInWithEmailAndPassword(auth, user.email, user.password)
          .then((userCredential) => {
            // Logged in 
            const user = userCredential.user;
                const newUserInfo = {...user};
                  newUserInfo.error = '';
                  newUserInfo.success = true;
                    setUser(newUserInfo);
                    setLoggedInUser(newUserInfo);
                    navigate(from, { replace: true });
                    console.log(userCredential);
                    
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
                const errorMessage = error.message;
                  console.log(errorCode, errorMessage);
                  const newUserInfo = {...user};
                    newUserInfo.error = errorMessage;
                    newUserInfo.success = false;
                      setUser(newUserInfo);
                      
      });
    }

      e.preventDefault();
  }

  const updateUserName = name =>{
    const auth = getAuth();
      updateProfile(auth.currentUser, {
        displayName: name
      }).then(() => {
          console.log("user name updated successfully");
      }).catch((error) => {
          console.log(error);
      });
  }

  const handleOnBlur=(event)=>{
      console.log(event.target.name, ':',event.target.value);
      let isFormValid;
      if(event.target.name === "email"){
        const isEmailValid=/\S+@\S+\.\S+/.test(event.target.value);
             isFormValid = isEmailValid;
      }
      if(event.target.name === "password"){
        const countPasswordCharacter = event.target.value.length > 8;
        const passwordHasNumber = /\d{1}/.test(event.target.value);
        let isPasswordValid = countPasswordCharacter && passwordHasNumber;
             isFormValid = isPasswordValid;
      }
      if(isFormValid){
        const newUserInfo = {...user};
              newUserInfo[event.target.name] = event.target.value;
              setUser(newUserInfo);
      }
  }



  return (
    <div style={{textAlign: "center"}}>
        <br/>
      {
        user.isSignedIn ? <button onClick={signOutClickHandler}>Google Sign Out</button> : <button onClick={signInClickHandler}>Google Sign in</button>
      }
      <br/>
      <button onClick = {fbSignInClickHandler}>Sign In with Facebook</button>
      {
        user.isSignedIn && <div>
                              <h1>Welcome {user.name}</h1>
                              <p>{user.email}</p>
                              <img src={user.photo} alt="" />
                          </div>
      }
        <br/>
        <br/>
        <br/>
        <h3>Name: {user.name}</h3>
        <h3>Email: {user.email}</h3>
        <h3>Password: {user.password}</h3>
        <br/>
        <br/>
      <form onSubmit={handleSubmit}>
        <input type="checkbox" name="newUser" onChange={() => setNewUser(!newUser)} id="" />
        <label htmlFor="newUser">New user sign up</label>
        <br/>
        {newUser && <input type="text" name='name' onBlur={handleOnBlur} placeholder='Enter your name' />}
        <br/>
        <input type="email" onBlur={handleOnBlur} name="email" placeholder='Enter your email' required />
        <br/>
        <input type="password" onBlur={handleOnBlur} name="password" id="" placeholder='Enter password' required />
        <br/>
        <input type="submit" value={newUser ? "Register" : "Log In"} />
      </form>
        {user.error && <p style={{color: "red"}}>This user already exist</p>}
        {user.success && <p style={{color: "green"}}>User {newUser ? "registered" : "logged in"} successfully</p>}
    </div>
  );
}

export default Login;
