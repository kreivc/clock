import "./App.css";
import Clock from "./component/clock";

function App() {
  const date = new Date();
  if (date.getHours() < 12) {
    return (
      <div className="AppPagi" id="app">
        <Clock />
      </div>
    );
  } else if (date.getHours() >= 12 && date.getHours() < 18) {
    return (
      <div className="AppSiang" id="app">
        <Clock />
      </div>
    );
  } else {
    return (
      <div className="AppMalam" id="app">
        <Clock />
      </div>
    );
  }
}

export default App;
