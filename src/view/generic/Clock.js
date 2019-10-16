import React from 'react';
import ClockUpdater from '../../controller/ClockUpdater';
import { throwStatement } from '@babel/types';

export default class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.update = this.update.bind(this);
    this.state = { minutes: 0 };
    this.minutesUpdater = new ClockUpdater();
    this.months = [
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
      'Dec'
    ];
  }

  componentDidMount() {
    this.minutesUpdater.start(this.update);
  }

  render() {
    return (
      <>
        <span>{this.months[this.state.month]}</span>
        <span>, {this.state.day}</span>
        <br />
        <span>{this.state.hours}</span>
        <span className="blinking">:</span>
        <span>{this.state.minutes}</span>
      </>
    );
  }

  update(date) {
    this.setState({
      month: date.getMonth(),
      day: date.getDate(),
      hours: date.getHours(),
      minutes: date.getMinutes()
    });
  }
}
