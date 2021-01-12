import React, { useState } from "react";

function Clock() {
  const date = new Date();
  const [hourtime, setHourtime] = useState(date.getHours());
  const [minutetime, setMinutetime] = useState(date.getMinutes());
  const [secondtime, setSecondtime] = useState(date.getSeconds());

  var amPm = hourtime < 12 ? "PM" : "AM";
  var day;
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

  if (hourtime < 12 && amPm === "AM") {
    day = "Good Morning";
  } else if (hourtime < 6 && hourtime >= 12 && amPm === "PM") {
    day = "Good Afternoon";
  } else {
    day = "Good Night";
  }

  const UpdateTime = () => {
    const date = new Date();
    if (date.getHours() > 12) {
      setHourtime(date.getHours() - 12);
    } else {
      setHourtime(date.getHours());
    }
    setMinutetime(date.getMinutes());
    setSecondtime(date.getSeconds());
    var ht = ("0" + hourtime).slice(-2);
    var mt = ("0" + minutetime).slice(-2);
    var st = ("0" + secondtime).slice(-2);
    return (
      <div>
        <h1 className="time">{ht + ":" + mt + ":" + st + " " + amPm}</h1>
        <h1 className="tanggal">{hari}</h1>
        <h1 className="hari">{day}</h1>
      </div>
    );
  };

  setInterval(UpdateTime, 1000);
  return (
    <div className="border">
      <UpdateTime />
    </div>
  );
}

export default Clock;
