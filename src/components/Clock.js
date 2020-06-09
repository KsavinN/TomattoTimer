import React from "react";

export default function Clock({ className="", hours = 0, minutes = 0, seconds = 0, miliseconds = 0 }) {
    const properTime = (time) => {
      if (0 > time || time > 60) {
        return (time > 60) ? '59' : '00';
      }
      time = '0' + time;
       
      return (time.length > 2) ? time.slice(1) : time;
    }
    
  const properMinutes = (minutes) => <span className="clock__minutes">{properTime(minutes)}</span>
  
  const properSeconds = (seconds) => <span className="clock__seconds">{properTime(seconds)}</span>

    const properHour = (time) => {
      if (0 > time || time > 24) {
        return (time > 24) ? '24' : '00';
      }
      time = '0' + time;
      return <span className={`clock__hours`}>{(time.length > 2) ? time.slice(1) : time}</span>
    }
    const properMili = (time) => {
      if (0 > time || time > 999) {
        return (time > 999) ? '999' : '000';
      }
      time = '00' + time;
      return (time.length > 3) ? time.slice(time.length - 3) : time;
    }
    
    const separator = () => <span className={`clock__separator`}>:</span>
    
  return (<h2 className={"clock "}>
    {properHour(hours)}{separator()}{properMinutes(minutes)}{separator()}{properSeconds(seconds)}
    </h2>)
  }