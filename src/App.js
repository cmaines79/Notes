// import firebase files
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirebaseConfig } from './firebase-config';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

// importing react components
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useState } from 'react';
import Home from './components/home/Home';
import Welcome from './components/welcome/Welcome';

// importing css and other variables
import photo from './img/profile_placeholder.png';
import './App.css';

function App() {
  // TO-DO:
    // logic to generate default JSON formated Object if the user is new.

  // states
  const [userStatusForHeader, setUserStatusForHeader] = useState(0);
  const [userName, setUserName] = useState('J. Doe');
  const [profilePicUrl, setProfilePicUrl] = useState(photo);

  // Google Sign-in
  const signInUser = async () => {
    var provider = new GoogleAuthProvider();
    await signInWithPopup(getAuth(), provider);

    // see if user is a new user in our database.  If so, create default JSON Ojbect
    isUserNewFirebaseUser(getAuth().currentUser.uid);
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

  // get signed-in user's uid
  const getUserUid = () => {
    return getAuth().currentUser.uid;
  }

  // get signed-in user's email
  const getUserEmail = () => {
    return getAuth().currentUser.email;
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
  // console.log(getAuth().currentUser.uid);

  // const test = async() => {
  //   try {
  //     const docRef = await addDoc(collection(db, "users"), {
  //       first: "Ada",
  //       last: "Lovelace",
  //       born: 1815
  //     });
  //     console.log("Document written with ID: ", docRef.id);
  //   } catch (e) {
  //     console.error("Error adding document: ", e);
  //   }
  // }

  const defaultCollection = () => {
    const defaultJSON = {
      user: {
        userId: getUserUid(),
        userName: getUserName(),
        userEmail: getUserEmail(),
      },
      notes: [],
    }

    return defaultJSON;
  }

  const isUserNewFirebaseUser = async(user) => {
    try {
      const querySnapshot = await getDocs(collection(db, user));
      if(querySnapshot.length === undefined) {
        // create the new user and JSON formatted Object
        try {
          const docRef = await addDoc(collection(db, user), defaultCollection());
          console.log("Document written with ID: ", docRef.id);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      } 
    } catch (e) {
      console.error("Error getting document: ", e);
    }
  }

  const getTestData = async() => {
    try {
      const querySnapshot = await getDocs(collection(db, getAuth().currentUser.uid));
      querySnapshot.forEach((doc) => {
        let a = doc.data();

        console.log(a);
      })
    } catch (e) {
      console.log(e);
    }
  }
  
  // init firebase App and firebase Auth
  const firebaseAppConfig = getFirebaseConfig();
  const app = initializeApp(firebaseAppConfig);
  const db = getFirestore(app);
  initFirebaseAuth();

  // getTestData();

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {isUserSignedIn() ? (
              <Home userStatusForHeader={userStatusForHeader} signInUser={signInUser} signOutUser={signOutUser} userName={userName} profilePicUrl={profilePicUrl}/>
          ) : (
            <Welcome userStatusForHeader={userStatusForHeader} signInUser={signInUser} signOutUser={signOutUser} userName={userName} profilePicUrl={profilePicUrl}/>
          )}
         
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
