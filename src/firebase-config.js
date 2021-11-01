const config = {
    apiKey: "AIzaSyAD18CuSCy08G9SmLKu4Ti5zH-iS4tMryM",
    authDomain: "pro-notes-app.firebaseapp.com",
    projectId: "pro-notes-app",
    storageBucket: "pro-notes-app.appspot.com",
    messagingSenderId: "722100090280",
    appId: "1:722100090280:web:c501a76d1288c0f2c9d99d",
    measurementId: "G-29JG6FECTB"
  };

  export function getFirebaseConfig() {
      if(!config || !config.apiKey) {
          throw new Error('No Firebase configuration object provided.' + '\n' + 
          'Add your web app\'s configuration obecjt to firebase-config.js');
      } else {
        return config;
      }
  }