import React, { Suspense } from "react";
import "./App.css";
import Loader from "./component/loader";
const Clock = React.lazy(() => import("./component/clock"));

function App() {
  const date = new Date();
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

export default App;
