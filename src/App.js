// import firebase files
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';
import { getFirebaseConfig } from './firebase-config';

// importing componenets
import Head from './components/Head';

// importing css
import './App.css';

function App() {
  // Google Sign-in
  const signIn = async () => {
    var provider = new GoogleAuthProvider();
    await signInWithPopup(getAuth(), provider);
  }

  const signOut = () => {
    signOut(getAuth());
  }

  const initFirebaseAuth = () => {
    onAuthStateChanged(getAuth(), authStateObserver);
  }

  const getProfilePicUrl = () => {
    return getAuth().currentUser.photoURL || '/images/profiel_placeholder.png';
  }

  const getUserName = () => {
    return getAuth().currentUser.displayName;
  }

  const isUserSignedIn = () => {
    return !!getAuth().currentUser;
  }

  const authStateObserver = (user) => {
    // user is signed in!
    if(user) {
      //get the signed-in user profile pic and name
      var profilePicUrl = getProfilePicUrl();
      var userName = getUserName();

      // set profile pic and username

      // show user's profile and sign out button 

      // hide sign-in button

    } else {
      // user  is signed out!
      // hide user's profile and sign-out button

      // show sign-in button
    }
    
    // shortcuts to DOM Elements
    const signInButtonElement = document.getElementById('sign-in');
    
  }
  
  const firebaseAppConfig = getFirebaseConfig();
  const app = initializeApp(firebaseAppConfig);
  const analytics = getAnalytics(app);
  

  return (
    <div className="App">
      <Head />
      hello world
    </div>
  );
}

export default App;
