import React, { useState } from "react";

// const copyToClipboard = (str) => {
//   var el = document.createElement("textarea");
//   el.value = str;
//   el.style.top = "0";
//   el.style.left = "0";
//   el.style.position = "fixed";
//   document.body.appendChild(el);
//   el.focus();
//   el.select();
//   try {
//     var successful = document.execCommand("copy");
//     var msg = successful ? "successful" : "unsuccessful";
//     console.log("Fallback: Copying text command was " + msg);
//   } catch (err) {
//     console.error("Fallback: Oops, unable to copy", err);
//   }
//   document.body.removeChild(el);
// };

function Clock() {
  let time = new Date().toLocaleTimeString();
  const date = new Date();
  const [ctime, setCtime] = useState(time);

  var weekday = new Array(7);
  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";

  var month = new Array(12);
  month[0] = "January";
  month[1] = "February";
  month[2] = "March";
  month[3] = "April";
  month[4] = "May";
  month[5] = "June";
  month[6] = "July";
  month[7] = "August";
  month[8] = "September";
  month[9] = "October";
  month[10] = "November";
  month[11] = "December";

  var hari =
    weekday[date.getDay()] +
    ", " +
    date.getDate() +
    " " +
    month[date.getMonth()] +
    " " +
    date.getFullYear();

  var day;
  if (date.getHours() < 12) {
    day = "Good Morning";
  } else if (date.getHours() >= 12 && date.getHours() < 18) {
    day = "Good Afternoon";
  } else {
    day = "Good Night";
  }

  const UpdateTime = () => {
    time = new Date().toLocaleTimeString();
    setCtime(time);
  };

  setInterval(UpdateTime, 1000);
  return (
    <div className="divWrap">
      <h1 className="time" /*onClick={copyToClipboard(ctime)}*/>{ctime}</h1>
      <h1 className="tanggal" /*onClick={copyToClipboard(hari)}*/>{hari}</h1>
      <h1 className="day">{day}</h1>
    </div>
  );
}

export default Clock;
