import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import { DragMap } from '../Draggable';
import Client from '../../helpers/Client.ts';
import compareObjects from '../../../helpers/compareObjects';
import createCell from '../../helpers/createCell';
import getBody from './getBody';
import moveDate from './moveDate';
import createAvatar from './createAvatar';
import calendarStyle from './calendarStyle';

class CalendarView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: null,
      startDate: new Date(),
      tasks: null,
      draggingTask: null,
      body: [],
    };
  }

  componentDidMount() {
    this.setState({ _id: shortid.generate() });
  }

  static getDerivedStateFromProps(props, state) {
    return {
      ...state,
      tasks: props.tasks || null,
      startDate: new Date(props.startDate),
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (!compareObjects(this.state.tasks, prevState.tasks)) {
      this.setState({
        body: getBody(this.props, this.state, this.createAvatar),
      });
    }
  }

  renderHeader = () => {
    let array = [<div key={`${this.state._id}-header-0`}></div>];
    let startDate = new Date(this.state.startDate);

    for (let i = 1; i < this.props.columns + 1; i++) {
      array.push(
        <div key={`${this.state._id}-header-${i}`}>
          {startDate.toLocaleDateString('ru-RU')}
        </div>
      );
      startDate.setDate(startDate.getDate() + 1);
    }

    return array;
  };

  arrangeTask = (data) => {
    let { index, listId, taskId } = data;

    let arrangeDate = moveDate(
      this.state.startDate,
      index.x,
      index.y,
      this.props.timeStep
    );

    Client.changeTask({ assignedTo: arrangeDate }, listId, taskId);
  };

  onDragStart = ({ index: { x, y }, height }) => {
    let { body, tasks, _id } = this.state;

    body[x - 1].splice(
      y + 1,
      0,
      createCell(_id + 'temp', 'droparea', 'calendar-cell', { x, y })
    );

    for (let i = x + 1; i < x + height; i++) {
      body[i - 1][y].type = 'droparea';
    }

    let arrangeDate = moveDate(this.state.startDate, x, y, this.props.timeStep);

    const { taskId } = tasks[arrangeDate.getTime()];

    this.setState({
      body,
      draggingTask: taskId,
    });
  };

  onDelete = ({ index: { x, y }, height }) => {
    let { body, tasks, _id } = this.state;

    for (let i = x; i < x + height; i++) {
      body[i][y].type = 'droparea';
    }

    let arrangeDate = moveDate(this.state.startDate, x, y, this.props.timeStep);

    delete tasks[arrangeDate.getTime()];

    this.setState({
      body,
      tasks,
    });
  };

  rejectDrag = ({ index: { x, y }, height }) => {
    let { body } = this.state;

    body[x - 1].splice(y + 1, 1);

    for (let xDiff = x + 1; xDiff < x + height; xDiff++) {
      body[xDiff - 1][y].type = 'hidden';
    }

    this.setState({
      body,
      draggingTask: null,
    });
  };

  createAvatar = (attributes, height) => {
    const { _id } = this.state;
    return createAvatar(
      this.onDelete,
      this.onDragStart,
      this.rejectDrag,
      _id,
      attributes,
      height
    );
  };

  reassignAvatar = (
    { tasks, body, _id },
    { startDate, timeStep },
    originalIndex,
    destinationIndex,
    height
  ) => {
    let arrangeDate = moveDate(
      startDate,
      originalIndex.x,
      originalIndex.y,
      timeStep
    );
    let dest = destinationIndex;

    let { title, content, listId, taskId } = tasks[arrangeDate.getTime()];
    let newAvatar = createCell(
      _id,
      'avatar',
      'calendar-cell',
      { x: dest.x, y: dest.y },
      this.createAvatar({ title, content, index: dest, listId, taskId }, height)
    );

    body[originalIndex.x - 1].splice(originalIndex.y + 1, 1);

    for (let xDiff = 0; xDiff < height; xDiff++) {
      body[originalIndex.x - 1 + xDiff][originalIndex.y] = createCell(
        _id,
        'droparea',
        'calendar-cell',
        { x: originalIndex.x + xDiff, y: originalIndex.y }
      );

      if (!xDiff) {
        body[dest.x - 1][dest.y] = newAvatar;
      } else {
        body[dest.x - 1 + xDiff][dest.y] = createCell(
          _id,
          'hidden',
          'calendar-cell',
          {
            x: dest.x + xDiff,
            y: dest.y,
          }
        );
      }
    }

    this.setState({ body, draggingTask: null });
  };

  render() {
    const { body } = this.state;
    const { style, className, rows, columns } = this.props;
    return (
      <div
        className={'calendar ' + (className || '')}
        style={{
          ...style,
          ...calendarStyle(rows, columns),
        }}
      >
        {!this.state.tasks ? (
          <p>Loading...</p>
        ) : (
          <>
            {this.renderHeader()}
            <DragMap
              rows={this.props.rows}
              columns={this.props.columns + 1}
              createAvatar={this.createAvatar}
              reassignAvatar={(...args) =>
                this.reassignAvatar(this.state, this.props, ...args)
              }
              onDataUpdate={this.arrangeTask}
              map={body}
            />
          </>
        )}
      </div>
    );
  }
}

CalendarView.propTypes = {
  rows: PropTypes.number.isRequired,
  columns: PropTypes.number.isRequired,
  tasks: PropTypes.objectOf(PropTypes.object),
  startDate: PropTypes.instanceOf(Date).isRequired,
  timeStep: PropTypes.number.isRequired,
};

export default CalendarView;
