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
        task = this.state.tasks[arrangeDate.valueOf()];

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

          let { title, duration, listId, _id } = task;

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
                taskId: _id,
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

  replaceBack = ({ index: { x, y }, height }) => {
    let arrangeDate = this.moveDate(this.state.startDate, x, y);
    let task = this.state.tasks[arrangeDate.valueOf()];
    let { body, _id } = this.state;
    body[x - 1].splice(y + 1, 0, {
      type: 'droparea',
      className: 'calendar-cell',
      key: key(x, y, _id),
      index: { x: x, y: y },
    });

    for (let i = x + 1; i < x + height; i++) {
      body[i - 1][y].type = 'droparea';
    }
    this.setState({
      body,
      draggingTask: task._id,
    });
  };

  rejectDrag({ index: { x, y }, height }) {
    let { body, _id } = this.state;
    body[x - 1].splice(y + 1, 1);

    for (let i = x + 1; i < x + height; i++) {
      body[i - 1][y].type = 'hidden';
    }

    this.setState({
      body,
    });
  }

  createAvatar(attributes, count) {
    let style = attributes.style || {};
    if (attributes.index) {
      style = {
        ...style,
        gridColumn: attributes.index.y + 1,
        gridRow: attributes.index.x + 1 + '/span ' + count,
      };
    }
    return (
      <TaskAvatar
        {...attributes}
        height={count}
        style={style}
        taskId={attributes.taskId}
        listId={attributes.listId}
        onDragStart={() => this.replaceBack(attributes)}
        onReject={() => this.rejectDrag(attributes)}
      />
    );
  }

  render() {
    return (
      <div
        className={'calendar ' + (this.props.className || '')}
        style={Object.assign(this.props.style, {
          display: 'grid',
          gridAutoFlow: 'row',
          gridTemplateColumns: `repeat(${this.props.columns + 1},1fr)`,
          gridTemplateRows: `repeat(${this.props.rows + 1},1fr)`,
        })}
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
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
  startDate: PropTypes.instanceOf(Date).isRequired,
  timeStep: PropTypes.number.isRequired,
};

export default CalendarView;
