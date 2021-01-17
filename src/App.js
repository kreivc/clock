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
  const { uid, displayName } = auth.currentUser;
  const alarmRef = firestore.collection("alarm");
  const query = alarmRef.orderBy("detail").limit(10);
  const [alarm] = useCollectionData(query, { idField: "id" });
  const [alarmValue, setAlarmValue] = useState("");

  const sendAlarm = async (e) => {
    e.preventDefault();

    await alarmRef.add({
      detail: alarmValue,
      displayName,
      uid,
    });
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  const stopAlarm = (e) => {
    e.preventDefault();
    document.querySelector(".Sound").pause();
    document.querySelector(".Sound").currentTime = 0;
  };

  const setAlarm = () => {
    var h = document.querySelector(".hours").value;
    var m = document.querySelector(".minutes").value;
    var ap = document.querySelector(".ampm").value;
    var hmap = `${h}:${m}:00 ${ap}`;
    setAlarmValue(hmap);
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

        <div>
          <select className="hours" onChange={setAlarm}>
            <option>00</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
            <option>9</option>
            <option>10</option>
            <option>11</option>
            <option>12</option>
          </select>
          <select className="minutes" onChange={setAlarm}>
            <option>00</option>
            <option>01</option>
            <option>02</option>
            <option>03</option>
            <option>04</option>
            <option>05</option>
            <option>06</option>
            <option>07</option>
            <option>08</option>
            <option>09</option>
            <option>10</option>
            <option>11</option>
            <option>12</option>
            <option>13</option>
            <option>14</option>
            <option>15</option>
            <option>16</option>
            <option>17</option>
            <option>18</option>
            <option>19</option>
            <option>20</option>
            <option>21</option>
            <option>22</option>
            <option>23</option>
            <option>24</option>
            <option>25</option>
            <option>26</option>
            <option>27</option>
            <option>28</option>
            <option>29</option>
            <option>30</option>
            <option>31</option>
            <option>32</option>
            <option>33</option>
            <option>34</option>
            <option>35</option>
            <option>36</option>
            <option>37</option>
            <option>38</option>
            <option>39</option>
            <option>40</option>
            <option>41</option>
            <option>42</option>
            <option>43</option>
            <option>44</option>
            <option>45</option>
            <option>46</option>
            <option>47</option>
            <option>48</option>
            <option>49</option>
            <option>50</option>
            <option>51</option>
            <option>52</option>
            <option>53</option>
            <option>54</option>
            <option>55</option>
            <option>56</option>
            <option>57</option>
            <option>58</option>
            <option>59</option>
          </select>
          <select className="ampm" onChange={setAlarm}>
            <option>AM</option>
            <option>PM</option>
          </select>
          <button className="submitTime" type="submit" onClick={sendAlarm}>
            Set Alarm
          </button>
          <button className="stop" onClick={stopAlarm}>
            Stop
          </button>
        </div>
      </form>
    </>
  );
}

function AlarmView(props) {
  const { detail } = props.alarm;
  const [timeNow, setTimeNow] = useState();

  const delAlarm = async (e) => {
    e.preventDefault();

    firestore.collection("alarm").doc(props.alarm.id).delete();
  };

  const UpdateTime = () => {
    let time = new Date().toLocaleTimeString();
    setTimeNow(time);
  };

  setInterval(UpdateTime, 1000);

  useEffect(() => {
    if (detail === timeNow) {
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
