import React from 'react';

class Task extends React.Component {
  render() {
    return (
      <div class="task-card">
        <p>{this.props.title}</p>
      </div>
    );
  }
}

export default Task;
