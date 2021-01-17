import React, { Suspense, useRef, useState, useEffect } from "react";
import "./App.css";
import Loader from "./component/loader";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

import Sound from "./sound/AlarmForUKreivc.mp3";

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

function App() {
  const [user] = useAuthState(auth);
  const date = new Date();
  const [appClass, setAppClass] = useState("");
  function ClockFinal() {
    if (date.getHours() < 12) {
      setAppClass("AppPagi");
    } else if (date.getHours() >= 12 && date.getHours() < 18) {
      setAppClass("AppSiang");
    } else {
      setAppClass("AppMalam");
    }
    return (
      <div className={`${appClass}`} id="app">
        <Suspense fallback={<Loader />}>
          <Clock />
        </Suspense>
      </div>
    );
  }

  return (
    <div className="landing">
      <header>
        <SignOut />
      </header>
      <section>
        {user ? (
          <div>
            <Alarm />
            <ClockFinal />
          </div>
        ) : (
          <div>
            <SignIn />
            <ClockFinal />
          </div>
        )}
      </section>
    </div>
  );
}

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

function Alarm() {
  const dummy = useRef();
  const alarmRef = firestore.collection("alarm");
  const query = alarmRef.orderBy("detail").limit(25);
  const [alarm] = useCollectionData(query, { idField: "id" });
  const [formValue, setFormValue] = useState("");

  const sendAlarm = async (e) => {
    e.preventDefault();

    const { uid, displayName } = auth.currentUser;

    await alarmRef.add({
      detail: formValue,
      displayName,
      uid,
    });

    setFormValue("");
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  const stopAlarm = (e) => {
    e.preventDefault();
    document.querySelector(".Sound").pause();
  };

  return (
    <>
      <form className="sectionInput">
        <div className="alrView">
          {alarm &&
            alarm.map((alr) => (
              <div>
                <AlarmView key={alr.id} alarm={alr} />
              </div>
            ))}
          <span ref={dummy}></span>
        </div>

        <input
          className="inpTime"
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="Input Alarm Time"
        />

        <button
          className="submitTime"
          type="submit"
          onClick={sendAlarm}
          disabled={!formValue}
        >
          Submit
        </button>
        <button className="stop" onClick={stopAlarm}>
          Stop
        </button>
      </form>
    </>
  );
}

function AlarmView(props) {
  const { detail } = props.alarm;

  const delAlarm = async (e) => {
    e.preventDefault();

    firestore.collection("alarm").doc(props.alarm.id).delete();
  };
  const [timeNow, setTimeNow] = useState();

  const UpdateTime = () => {
    let time = new Date().toLocaleTimeString();
    setTimeNow(time);
  };

  setInterval(UpdateTime, 1000);

  useEffect(() => {
    if (detail === timeNow) {
      alert("ALARM RINGING");
      document.querySelector(".Sound").play();
    }
  }, [UpdateTime]);

  return (
    <>
      <div className="timeAlarmBox">
        <h1>{detail}</h1>
        <h1 onClick={delAlarm} className="delAlarm">
          ❌
        </h1>
      </div>
      <div className="playback">
        <audio className="Sound">
          <source src={Sound} type="audio/mp3" />
        </audio>
      </div>
    </>
  );
}

export default App;
