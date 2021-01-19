import React, { useEffect, useState } from "react";
import { useTheme, createUseStyles } from "react-jss";
import clockUpdater from "../../helpers/clockUpdater.js";
import styles from "./Clock.styles.js";
import months from "../../helpers/months";

const useStyles = createUseStyles(styles);

export default function Clock() {
  const theme = useTheme();
  const classes = useStyles(theme);

  const [minutesUpdater] = useState(clockUpdater());
  const [date, setDate] = useState({
    minutes: 0,
    hours: 0,
    day: 0,
    month: 0,
  });

  const updateTime = (date) => {
    setDate({
      month: date.getMonth() + 1,
      day: date.getDate(),
      hours: date.getHours(),
      minutes: date.getMinutes(),
    });
  };

  useEffect(() => {
    minutesUpdater.start(updateTime);
    return () => {
      minutesUpdater.stop();
    };
  }, [minutesUpdater]);

  return (
    <>
      <div className={classes.root}>
        <span>{months[date.month]}</span>
        <span>, {date.day}</span>
        <br />
        <span>{date.hours.toString().padStart(2, "0")}</span>
        <span className={classes.blinking}>:</span>
        <span>{date.minutes.toString().padStart(2, "0")}</span>
      </div>
    </>
  );
}
