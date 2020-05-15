import React from "react";

export default function Clock({ className = "", hours = 0, minutes = 0, seconds = 0, miliseconds = 0 }) {
    const properTime = (time) => {
      if (0 > time || time > 60) {
        return (time > 60) ? '59' : '00';
      }
      time = '0' + time;
      return (time.length > 2) ? time.slice(1) : time;
    }
    const properHour = (time) => {
      if (0 > time || time > 24) {
        return (time > 24) ? '24' : '00';
      }
      time = '0' + time;
      return (time.length > 2) ? time.slice(1) : time;
    }
    const properMili = (time) => {
      if (0 > time || time > 999) {
        return (time > 999) ? '999' : '000';
      }
      time = '00' + time;
      return (time.length > 3) ? time.slice(time.length - 3) : time;
    }
    const clockNumbers = () => {
      return `${properHour(hours)}:${properTime(minutes)}:${properTime(seconds)}.${properMili(miliseconds)}`
    }
    return <h2 className={"Clock " + className}>{clockNumbers()}</h2>
  }