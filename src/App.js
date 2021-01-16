import React, { Suspense } from "react";
import "./App.css";
import Loader from "./component/loader";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

const Clock = React.lazy(() => import("./component/clock"));

firebase.initializeApp({
  apiKey: "AIzaSyCiWJXV_tTyzpJzwkPHceEEZCBYLfbAL0E",
  authDomain: "clockreivc.firebaseapp.com",
  projectId: "clockreivc",
  storageBucket: "clockreivc.appspot.com",
  messagingSenderId: "456791742942",
  appId: "1:456791742942:web:15b8dd82170313cf9a254f",
  measurementId: "G-ZDE84MVV3T",
});

const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();

function App() {
  const [user] = useAuthState(auth);
  const date = new Date();
  function ClockFinal() {
    if (date.getHours() < 12) {
      return (
        <div className="AppPagi" id="app">
          <Suspense fallback={<Loader />}>
            <Clock />
          </Suspense>
        </div>
      );
    } else if (date.getHours() >= 12 && date.getHours() < 18) {
      return (
        <div className="AppSiang" id="app">
          <Suspense fallback={<Loader />}>
            <Clock />
          </Suspense>
        </div>
      );
    } else {
      return (
        <div className="AppMalam" id="app">
          <Suspense fallback={<Loader />}>
            <Clock />
          </Suspense>
        </div>
      );
    }
  }

  return (
    <div className="landing">
      <header>
        <SignOut />
      </header>
      <section>
        {user ? (
          <ClockFinal />
        ) : (
          <div>
            <SignIn />
            <ClockFinal />
          </div>
        )}
      </section>
    </div>
  );

  function SignIn() {
    const signInWithGoogle = () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(provider);
    };

    return (
      <>
        <button className="sign" onClick={signInWithGoogle}>
          Sign in with Google
        </button>
      </>
    );
  }

  function SignOut() {
    return (
      auth.currentUser && (
        <button className="sign" onClick={() => auth.signOut()}>
          Sign Out
        </button>
      )
    );
  }
}

export default App;
