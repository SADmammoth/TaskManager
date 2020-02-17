import React from "react";
import TaskCard from "../TaskListView/TaskCard";
import DraggableArea from "./DraggableArea";
import TaskAvatar from "../TaskListView/TaskAvatar";

class DragMap extends React.Component {
  state = {
    body: []
  };
  componentDidMount() {
    this.setState({
      body: React.Children.map(this.props.children, child =>
        child.type === DraggableArea
          ? React.cloneElement(child, { setData: this.setData })
          : child
      )
    });
  }
  render() {
    return <>{this.state.body}</>;
  }

  setData = data => {
    let { height, index, title, Avatar = avatar } = data;
    let array = [...this.state.body];
    let curr;
    for (let i = 0; i < height; i++) {
      curr = array[(index.x + i - 1) * this.props.columns + index.y];
      if (!(curr.type === DraggableArea)) {
        return;
      }
    }
    for (let i = 0; i < height; i++) {
      if (i === 1) {
        array[
          (index.x - 1) * this.props.columns + index.y
        ] = this.props.rowspan_cb(
          React.cloneElement(Avatar, {
            key: shortid.generate(),
            index: index,
            duration: height,
            title: title
          }),
          height
        );
      }
      array[(index.x + i - 1) * this.props.columns + index.y] = null;
    }
    this.setState({ body: array });

    this.props.onDataUpdate(data);
  };
}

export default DragMap;
