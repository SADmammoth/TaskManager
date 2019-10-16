import React from 'react';
import ClockUpdater from '../../controller/ClockUpdater';

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

  componentWillUnmount() {
    this.minutesUpdater.stop();
  }

  render() {
    return (
      <>
        <div className="clock">
          <span key={'mth' + this.state.month}>{this.months[this.state.month]}</span>
          <span key={'d' + this.state.day}>, {this.state.day}</span>
          <br />
          <span key={'h' + this.state.hours}>{this.state.hours}</span>
          <span className="blinking">:</span>
          <span key={'m' + this.state.minutes}>{this.state.minutes}</span>
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
