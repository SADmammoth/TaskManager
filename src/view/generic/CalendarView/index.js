import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import { DropArea, DragMap } from '../Draggable';
import Client from '../../../helpers/Client.ts';
import TaskAvatar from '../TaskListView/TaskAvatar';

class CalendarView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: null,
      startDate: new Date(),
      tasks: {},
      loadEnded: false,
    };
  }

  componentDidMount() {
    Client.getTasks(0)
      .then((res) => {
        let tasks = {};
        res.tasks.forEach((el) => {
          if (el.assignedTo) {
            tasks[new Date(el.assignedTo).valueOf().toString()] = el;
          }
        });
        return tasks;
      })
      .then((tasks) => {
        this.setState({
          _id: shortid.generate(),
          startDate: new Date(this.props.startDate),
          tasks: tasks,
          loadEnded: true,
        });
      });
  }

  renderHeader = () => {
    let array = [<div key={`${this.state._id}-header-0`}></div>];
    let startDate = new Date(this.state.startDate);
    let date = startDate.toLocaleDateString('ru-RU');

    for (let i = 1; i < this.props.columns + 1; i++) {
      array.push(<div key={`${this.state._id}-header-${i}`}>{date}</div>);
      startDate.setDate(startDate.getDate() + 1);
    }

    return array;
  };

  moveDate = (date, x, y) => {
    let arrangeDate = new Date(date);
    arrangeDate.setDate(arrangeDate.getDate() + x - 1);

    arrangeDate.setHours(
      arrangeDate.getHours() + (y - 1) * this.props.timeStep
    );

    return arrangeDate;
  };

  renderBody = () => {
    let array = [];
    let row;
    let startDate = new Date(this.state.startDate);
    let arrangeDate;
    let task;

    let key = (r, c) => {
      return `${this.state._id}-body-${r}-${c}`;
    };

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
        <div key={key(r, 0)}>
          {this.props.startDate.getHours() + this.props.timeStep * r - 1}
        </div>
      );

      for (let c = 1; c < this.props.columns + 1; c++) {
        let index = skip.indexOf(r, c);

        if (index >= 0) {
          skip.removeAt(index);
          continue;
        }

        arrangeDate = this.moveDate(startDate, r, c);

        task = this.state.tasks[arrangeDate.valueOf()];

        if (task) {
          for (let i = 0; i < task.duration; i++) {
            skip.push(r, c);
          }

          let { title, duration } = task;

          row.push(
            this.createAvatar(
              {
                key: shortid.generate(),
                index: { x: r, y: c },
                title: title,
                height: duration,
              },
              task.duration
            )
          );
        } else {
          row.push(
            <DropArea
              className="calendar-cell"
              key={key(r, c)}
              index={{ x: r, y: c }}
            />
          );
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

  createAvatar(attributes, count) {
    return (
      <TaskAvatar
        {...attributes}
        height={count}
        style={Object.assign(attributes.style || {}, {
          gridColumn: attributes.index.y + 1,
          gridRow: attributes.index.x + 1 + '/span ' + count,
        })}
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
        {this.state.loadEnded && (
          <>
            {this.renderHeader()}
            <DragMap
              rows={this.props.rows}
              columns={this.props.columns}
              createAvatar={this.createAvatar}
              onDataUpdate={this.arrangeTask}
            >
              {this.renderBody()}
            </DragMap>
          </>
        )}
      </div>
    );
  }
}

CalendarView.propTypes = {
  rows: PropTypes.number.isRequired,
  columns: PropTypes.number.isRequired,
  startDate: PropTypes.instanceOf(Date).isRequired,
  timeStep: PropTypes.number.isRequired,
};

export default CalendarView;
