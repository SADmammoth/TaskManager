import React from 'react';
import ClockUpdater from '../helpers/ClockUpdater.ts';

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

export default class Clock extends React.Component {
  minutesUpdater = new ClockUpdater();
  state = {
    minutes: 0,
    hours: 0,
    day: 0,
    month: 0,
  };

  componentDidMount() {
    this.minutesUpdater.start(this.updateTime);
  }
  componentWillUnmount() {
    this.minutesUpdater.stop();
  }

  render() {
    return (
      <>
        <div className="clock">
          <span key={'mth' + this.state.month}>{months[this.state.month]}</span>
          <span key={'d' + this.state.day}>, {this.state.day}</span>
          <br />
          <span key={'h' + this.state.hours}>
            {this.state.hours.toString().padStart(2, '0')}
          </span>
          <span className="blinking">:</span>
          <span key={'m' + this.state.minutes}>
            {this.state.minutes.toString().padStart(2, '0')}
          </span>
        </div>
      </>
    );
  }

  updateTime = (date) => {
    this.setState({
      month: date.getMonth() + 1,
      day: date.getDate(),
      hours: date.getHours(),
      minutes: date.getMinutes(),
    });
  };
}
