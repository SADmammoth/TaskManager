import React from "react";
import PropTypes from "prop-types";
import { DraggableArea, DragMap } from "../Draggable";
import { runInThisContext } from "vm";

class CalendarView extends React.Component {
  state = {
    startDate: new Date()
  };

  componentDidMount() {
    this.setState({
      startDate: this.props.startDate
    });
  }

  render() {
    let RenderHeader = () => {
      let array = [];
      let startDate = new Date(this.state.startDate);
      array.push(<div></div>);
      for (let i = 0; i < this.props.columns - 1; i++) {
        startDate.setDate(startDate.getDate() + 1);
        array.push(<div>{startDate.toLocaleDateString("ru-RU")}</div>);
      }
      return array;
    };

    let RenderBody = () => {
      let firstCell;
      let array = [];
      let row;
      for (let r = 1; r < this.props.rows; r++) {
        row = [];
        firstCell = (() => {
          return (
            <div>
              {this.props.startDate.getHours() + this.props.timeStep * r}
            </div>
          );
        })();
        row.push(firstCell);
        for (let c = 1; c < this.props.columns; c++) {
          row.push(
            <DraggableArea className="calendar-cell" index={{ x: r, y: c }} />
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
          gridTemplateColumns: `repeat(${this.props.columns},1fr)`,
          gridTemplateRows: `repeat(${this.props.rows},1fr)`
        })}
      >
        {RenderHeader()}
        <DragMap
          rows={this.props.rows}
          columns={this.props.columns}
          rowspan_cb={this.rowspan_cb}
        >
          {RenderBody()}
        </DragMap>
      </div>
    );
  }

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
