// import firebase files
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirebaseConfig } from './firebase-config';
import { getFirestore, collection, setDoc, doc, getDocs } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

// importing react components
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useState } from 'react';
import Home from './components/Home'
import Welcome from './components/Welcome';

// importing css and other variables
import photo from './assets/img/profile_placeholder.png';
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

    // see if user is a new user in our database.  If so, create default JSON Ojbect
    isUserNewFirebaseUser(getUserUid());
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

  // is the user a new user to our FireBase db?
  const isUserNewFirebaseUser = async(user) => {
    try {
      const querySnapshot = await getDocs(collection(db, user));
      // if the user is not in the firebase db
      if(querySnapshot.size === 0) {
        // create the new user and JSON formatted Object
        try {
          // setting up the "user" document structure
          setDoc(doc(db, user, "user"), {
            userId: getUserUid(),
            userName: getUserName(),
            userEmail: getUserEmail(),
          });

        // setting up the "reoordCounter" document structure
          setDoc(doc(db, user, "recordCounter"), {
            recordCount: 1,
          })

          // setting up the "notes" document structure
          setDoc(doc(db, user, "notes"), {
            meetingNotes: [],
          })
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      } 
    } catch (e) {
      console.error("Error getting document: ", e);
    }
  }
  
  // init firebase App and firebase Auth
  const firebaseAppConfig = getFirebaseConfig();
  const app = initializeApp(firebaseAppConfig);
  const db = getFirestore(app);
  initFirebaseAuth();

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {isUserSignedIn() ? (
              <Home userStatusForHeader={userStatusForHeader} signInUser={signInUser} signOutUser={signOutUser} userName={userName} profilePicUrl={profilePicUrl} db={db}/>
          ) : (
            <Welcome userStatusForHeader={userStatusForHeader} signInUser={signInUser} signOutUser={signOutUser} userName={userName} profilePicUrl={profilePicUrl}/>
          )}
         
        </Route>
      </Switch>
    </Router>
  );
}

export default App;