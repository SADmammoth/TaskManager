import React from "react";
import PropTypes from "prop-types";
import shortid from "shortid";
import { DraggableArea, DragMap } from "../Draggable";
import { runInThisContext } from "vm";
import Client from "../../../helpers/Client.ts";

class CalendarView extends React.Component {
  state = {
    startDate: new Date(),
    tasks: {},
    loadEnded: false
  };

  async componentDidMount() {
    let tasks = {};
    (await Client.getAllTasks()).tasks.forEach(el => {
      if (el.assignedTo)
        tasks[new Date(el.assignedTo).valueOf().toString()] = el;
    });
    this.setState({
      startDate: new Date(this.props.startDate),
      tasks: tasks,
      loadEnded: true
    });
  }

  render() {
    let RenderHeader = () => {
      let array = [];
      let startDate = new Date(this.state.startDate);
      array.push(<div></div>);
      for (let i = 1; i < this.props.columns + 1; i++) {
        array.push(
          <div key={shortid.generate()}>
            {startDate.toLocaleDateString("ru-RU")}
          </div>
        );

        console.log(startDate);
        startDate.setDate(startDate.getDate() + 1);
      }
      return array;
    };

    let RenderBody = () => {
      let firstCell;
      let array = [];
      let row;
      let skip = [];
      for (let r = 1; r < this.props.rows + 1; r++) {
        row = [];
        firstCell = (() => {
          return (
            <div key={shortid.generate()}>
              {this.props.startDate.getHours() + this.props.timeStep * r - 1}
            </div>
          );
        })();
        row.push(firstCell);
        for (let c = 1; c < this.props.columns + 1; c++) {
          let index = skip.indexOf(r.toString() + c.toString());
          if (index >= 0) {
            skip.splice(index, 1);
            continue;
          }
          let startDate = new Date(this.state.startDate);
          startDate.setDate(startDate.getDate() + c - 1);
          let arrangeDate = startDate;
          arrangeDate.setHours(
            arrangeDate.getHours() + (r - 1) * this.props.timeStep
          );
          let task = this.state.tasks[arrangeDate.valueOf()];

          if (task) {
            for (let i = r + 1; i < task.duration + r; i++) {
              skip.push(i.toString() + c.toString());
            }
            row.push(
              this.rowspan_cb(
                <div key={shortid.generate()} index={{ x: r, y: c }}>
                  {task.title}
                </div>,
                task.duration
              )
            );
            continue;
          }
          row.push(
            <DraggableArea
              className="calendar-cell"
              key={shortid.generate()}
              index={{ x: r, y: c }}
            />
          );
        }
        array.push(row);
      }

      return array;
    };
    return (
      <div
        className={"calendar " + (this.props.className || "")}
        style={Object.assign(this.props.style, {
          display: "grid",
          gridAutoFlow: "row",
          gridTemplateColumns: `repeat(${this.props.columns + 1},1fr)`,
          gridTemplateRows: `repeat(${this.props.rows + 1},1fr)`
        })}
      >
        {!this.state.loadEnded || (
          <>
            {RenderHeader()}
            <DragMap
              rows={this.props.rows}
              columns={this.props.columns}
              rowspan_cb={this.rowspan_cb}
              onDataUpdate={this.arrangeTask}
            >
              {RenderBody()}
            </DragMap>
          </>
        )}
      </div>
    );
  }
  arrangeTask = data => {
    let { index, height, listId, taskId } = data;
    let startDate = new Date(this.state.startDate);
    startDate.setDate(startDate.getDate() + (index.y - 1));
    let arrangeDate = startDate;
    arrangeDate.setHours(
      arrangeDate.getHours() + (index.x - 1) * this.props.timeStep
    );
    Client.changeTask({ assignedTo: arrangeDate }, listId, taskId);
  };

  rowspan_cb(element, count) {
    return React.cloneElement(element, {
      style: Object.assign(element.props.style || {}, {
        gridColumn: element.props.index.y + 1,
        gridRow: element.props.index.x + 1 + "/span " + count
      })
    });
  }
}

CalendarView.propTypes = {
  rows: PropTypes.number.isRequired,
  columns: PropTypes.number.isRequired,
  startDate: PropTypes.instanceOf(Date).isRequired,
  timeStep: PropTypes.number.isRequired
};

export default CalendarView;
