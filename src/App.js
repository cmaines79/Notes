// import firebase files
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirebaseConfig } from './firebase-config';
import { initializeApp } from 'firebase/app';

// importing react components
import { useState } from 'react';
import Head from './components/head/Head';

// importing css and other variables
import photo from './img/profile_placeholder.png'
import './App.css';

function App() {
  // states
  const [userStatusForHeader, setUserStatusForHeader] = useState(0);
  const [userName, setUserName] = useState('J. Doe');
  const [profilePicUrl, setProfilePicUrl] = useState(photo);

  // Google Sign-in
  const signInUser = async () => {
    var provider = new GoogleAuthProvider();
    await signInWithPopup(getAuth(), provider);
  }

  // Google Sign-out
  const signOutUser = () => {
    signOut(getAuth());
  }

  // Firebase init
  const initFirebaseAuth = () => {
    onAuthStateChanged(getAuth(), authStateObserver);
  }

  // get signed-in user's profile pic
  const getProfilePicUrl = () => {
    return getAuth().currentUser.photoURL || photo;
  }

  // get signed-in user's name
  const getUserName = () => {
    return getAuth().currentUser.displayName;
  }

  const isUserSignedIn = () => {
    return !!getAuth().currentUser;
  }
  
  // watching whether or not a user remains signed in
  const authStateObserver = (user) => {
    if (user) {
      // User is signed In!  Get the signed-in user's profile pic and name.
      setProfilePicUrl(getProfilePicUrl());
      setUserName(getUserName());
      setUserStatusForHeader(1);
    } else {
      // User is signed out!
      setUserStatusForHeader(0);
    }
  }
  
  // init firebase App and firebase Auth
  const firebaseAppConfig = getFirebaseConfig();
  initializeApp(firebaseAppConfig);
  initFirebaseAuth();

  return (
    <div className="App">
      <Head userStatusForHeader={userStatusForHeader} signInUser={signInUser} signOutUser={signOutUser} userName={userName} profilePicUrl={profilePicUrl}/>
      hello world
    </div>
  );
}

export default App;
