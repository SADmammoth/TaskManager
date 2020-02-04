import React from 'react';

class Task extends React.Component {
  render() {
    return (
      <div
        {...this.props}
        className={'task-card ' + (this.props.className || '')}
        style={this.props.style}
      >
        <p>{this.props.title}</p>
      </div>
    );
  }
}

export default Task;
