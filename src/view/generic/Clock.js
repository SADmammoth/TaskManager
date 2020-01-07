import React from 'react';
import ClockUpdater from '../../helpers/ClockUpdater';
import Enum from '../../helpers/Enum';
require('mdn-polyfills/String.prototype.padStart');

const months = new Enum({
  1: 'Jan',
  2: 'Feb',
  3: 'Mar',
  4: 'Apr',
  5: 'May',
  6: 'Jun',
  7: 'Jul',
  8: 'Aug',
  9: 'Sep',
  10: 'Oct',
  11: 'Nov',
  12: 'Dec'
});

export default class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.update = this.update.bind(this);
    this.state = {};
    this.minutesUpdater = new ClockUpdater();
  }

  UNSAFE_componentWillMount() {
    this.minutesUpdater.start(this.update);
  }

  componentWillUnmount() {
    this.minutesUpdater.stop();
  }

  render() {
    return (
      <>
        <div className="clock">
          <span key={'mth' + this.state.month}>
            {months[this.state.month + 1]}
          </span>
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

  update(date) {
    this.setState({
      month: date.getMonth(),
      day: date.getDate(),
      hours: date.getHours(),
      minutes: date.getMinutes()
    });
  }
}
