import React from 'react';
import propTypes from 'prop-types';
import Task from './Task';

class TaskList extends React.Component {
  render() {
    return (
      <ul>
        {this.props.tasks.map(el => (
          <li>
            <Task title={el.title} />
          </li>
        ))}
      </ul>
    );
  }
}

TaskList.propTypes = {
  tasks: propTypes.arrayOf(propTypes.shape({ title: propTypes.string }))
    .isRequired
};

export default TaskList;
