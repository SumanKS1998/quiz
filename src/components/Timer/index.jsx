import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../context/AppContext";

const Timer = () => {
  const initialTime = 10 * 60;
  const [seconds, setSeconds] = useState(initialTime);
  const { setTestOver } = useContext(AppContext);
  useEffect(() => {
    let interval = null;
    if (seconds === 0) {
      setTestOver(true);
    }
    if (seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [seconds]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div>
      <p className="font-bold">Time left: {formatTime(seconds)} mm:ss</p>
    </div>
  );
};

export default Timer;
