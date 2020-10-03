import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import { DropArea, DragMap } from '../Draggable';
import Client from '../../../helpers/Client.ts';
import TaskAvatar from '../TaskListView/TaskAvatar';
import compareObjects from '../../../helpers/compareObjects';
import toLinearIndex from '../../../helpers/toLinearIndex';
import key from '../../../helpers/getBodyKey';

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
      this.setState({ body: this.getBody() });
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

  moveDate = (date, x, y) => {
    let arrangeDate = new Date(date);
    arrangeDate.setDate(arrangeDate.getDate() + y - 1);
    arrangeDate.setHours(
      arrangeDate.getHours() + (x - 1) * this.props.timeStep
    );

    return arrangeDate;
  };

  getBody = () => {
    let array = [];
    let row;
    let startDate = new Date(this.state.startDate);
    let arrangeDate;
    let task;

    const { _id } = this.state;

    let skip = {
      array: [],
      push: (r, c) => {
        skip.array.push(r.toString() + ',' + c.toString());
      },
      indexOf: (r, c) => {
        return skip.array.indexOf(r.toString() + ',' + c.toString());
      },
      get: (i) => {
        return skip.array[i];
      },
      removeAt: (i) => {
        skip.array.splice(i, 1);
      },
    };

    for (let r = 1; r < this.props.rows + 1; r++) {
      row = [];
      row.push(
        <div key={key(r, 0, _id)}>
          {this.props.startDate.getHours() + this.props.timeStep * r - 1}
        </div>
      );

      for (let c = 1; c < this.props.columns + 1; c++) {
        let index = skip.indexOf(r, c);
        if (index >= 0) {
          row.push({
            className: 'calendar-cell',
            key: key(r, c, _id),
            index: { x: r, y: c },
            type: 'hidden',
          });
          skip.removeAt(index);
          continue;
        }

        arrangeDate = this.moveDate(startDate, r, c);
        task = this.state.tasks[arrangeDate];

        if (task) {
          for (let i = 0; i < task.duration; i++) {
            if (this.state.draggingTask === task._id && i > 0) {
              row.push({
                type: 'droparea',
                className: 'calendar-cell',
                key: key(r, c, _id),
                index: { x: r + i, y: c },
              });
            } else {
              skip.push(r + i, c);
            }
          }

          let { title, duration, listId, taskId } = task;

          row.push({
            type: 'avatar',
            className: 'calendar-cell',
            key: key(r, c, _id),
            index: { x: r, y: c },
            avatar: this.createAvatar(
              {
                key: key(r, c, _id),
                index: { x: r, y: c },
                title: title,
                listId,
                taskId,
                height: duration,
              },
              task.duration
            ),
          });
        } else {
          row.push({
            type: 'droparea',
            className: 'calendar-cell',
            key: key(r, c, _id),
            index: { x: r, y: c },
          });
        }
      }

      array.push(row);
    }

    return array;
  };

  arrangeTask = (data) => {
    let { index, listId, taskId } = data;

    let arrangeDate = this.moveDate(this.state.startDate, index.x, index.y);

    Client.changeTask({ assignedTo: arrangeDate }, listId, taskId);
  };

  replaceBack = ({ x, y }, height) => {
    let { body, _id } = this.state;
    body[x - 1].splice(y + 1, 0, {
      type: 'droparea',
      className: 'calendar-cell',
      key: key(x, y, _id + 'temp'),
      index: { x: x, y: y },
    });

    for (let i = x + 1; i < x + height; i++) {
      body[i - 1][y].type = 'droparea';
    }

    this.setState({
      body,
    });
  };

  rejectDrag({ x, y }, height) {
    let { body, _id } = this.state;
    body[x - 1].splice(y + 1, 1);

    for (let i = x + 1; i < x + height; i++) {
      body[i - 1][y].type = 'hidden';
    }

    this.setState({
      body,
    });
  }

  reassignAvatar = (originalIndex, destinationIndex, height) => {
    alert(0);
    let startDate = new Date(this.props.startDate);
    let arrangeDate = this.moveDate(
      startDate,
      originalIndex.x,
      originalIndex.y
    );
    let { tasks, body, _id } = this.state;
    console.log(originalIndex, destinationIndex, body);
    let { title, content, listId, taskId } = tasks[arrangeDate];
    let newAvatar = {
      type: 'avatar',
      className: 'calendar-cell',
      key: key(destinationIndex.x, destinationIndex.y, _id),
      index: { x: destinationIndex.x, y: destinationIndex.y },
      avatar: this.createAvatar(
        { title, content, index: destinationIndex, listId, taskId },
        height
      ),
    };

    body[originalIndex.x - 1].splice(originalIndex.y + 1, 1);
    for (let i = 0; i < height; i++) {
      body[originalIndex.x - 1 + i][originalIndex.y] = {
        type: 'droparea',
        className: 'calendar-cell',
        key: key(originalIndex.x + i, originalIndex.y, _id),
        index: { x: originalIndex.x + i, y: originalIndex.y },
      };
      if (!i) {
        body[destinationIndex.x - 1][destinationIndex.y] = newAvatar;
      } else {
        body[destinationIndex.x - 1 + i][destinationIndex.y] = {
          className: 'calendar-cell',
          key: key(destinationIndex.x + i, destinationIndex.y, _id),
          index: { x: destinationIndex.x + i, y: destinationIndex.y },
          type: 'hidden',
        };
      }
    }

    this.setState({ body });
  };

  createAvatar = (
    { title, content, index, style: oldStyle, listId, taskId },
    count
  ) => {
    let style = oldStyle || {};
    if (index) {
      style = {
        ...style,
        gridColumn: index.y + 1,
        gridRow: index.x + 1 + '/span ' + count,
      };
    }

    return (
      <TaskAvatar
        title={title}
        content={content}
        height={count}
        style={style}
        listId={listId}
        taskId={taskId}
        index={index}
        onDragStart={() => this.replaceBack(index, count)}
        onReject={() => this.rejectDrag(index, count)}
      />
    );
  };

  render() {
    return (
      <div
        className={'calendar ' + (this.props.className || '')}
        style={{
          ...this.props.style,
          display: 'grid',
          gridAutoFlow: 'row',
          gridTemplateColumns: `repeat(${this.props.columns + 1},1fr)`,
          gridTemplateRows: `repeat(${this.props.rows + 1},1fr)`,
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
              reassignAvatar={this.reassignAvatar}
              onDataUpdate={this.arrangeTask}
              map={this.state.body}
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