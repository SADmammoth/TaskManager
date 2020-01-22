import React from 'react';
import propTypes from 'prop-types';
import Task from './Task';
import DraggableElement from '../Draggable/DraggableElement';
import DraggableTask from './DraggableTask';

class TaskList extends React.Component {
  render() {
    return (
      <ul className={this.props.className || ''} style={this.props.style}>
        {this.props.tasks.map(el =>
          this.props.draggable ? (
            <li>
              <DraggableTask title={el.title} />
            </li>
          ) : (
            <li>
              <Task title={el.title} />
            </li>
          )
        )}
      </ul>
    );
  }
}

TaskList.propTypes = {
  tasks: propTypes.arrayOf(propTypes.shape({title: propTypes.string}))
    .isRequired
};

export default TaskList;
