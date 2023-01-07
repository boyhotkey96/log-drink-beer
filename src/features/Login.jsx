import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import React, { useEffect, useState } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

const config = {
  apiKey: 'AIzaSyAHukmW6N9-MATy2Sk5poAMefxGydiy6pY',
  authDomain: 'log-drink-beer.firebaseapp.com',
  // projectId: "log-drink-beer",
  // storageBucket: "log-drink-beer.appspot.com",
  // messagingSenderId: "329875026230",
  // appId: "1:329875026230:web:7da497daccd7e4f6288397"
};
firebase.initializeApp(config);

const uiConfig = {
  signInFlow: 'popup',
  signInSuccessUrl: '/',
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
};

function Login() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user) => {
        setIsSignedIn(!!user);
      });
    return () => unregisterAuthObserver();
  }, []);

  return (
    <div>
      <h1>Login Form</h1>
      <p>Please sign-in:</p>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      {!isSignedIn ? (
        <div>
          <h1>My App</h1>
          <p>Please sign-in:</p>
          <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
          />
        </div>
      ) : (
        <div>
          <h1>My App</h1>
          <p>
            Welcome {firebase.auth().currentUser.displayName}! You are now
            signed-in!
          </p>
          <a onClick={() => firebase.auth().signOut()}>Sign-out</a>
        </div>
      )}
    </div>
  );
}

export default Login;
