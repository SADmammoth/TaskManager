import React, { useEffect, useState } from 'react';
import clockUpdater from '../helpers/clockUpdater.js';

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export default function Clock() {
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
      <div className="clock">
        <span>{months[date.month]}</span>
        <span>, {date.day}</span>
        <br />
        <span>{date.hours.toString().padStart(2, '0')}</span>
        <span className="blinking">:</span>
        <span>{date.minutes.toString().padStart(2, '0')}</span>
      </div>
    </>
  );
}
