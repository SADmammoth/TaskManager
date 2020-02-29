import React from "react";
import TaskCard from "../TaskListView/TaskCard";
import DraggableArea from "./DraggableArea";

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
    console.log(data);
    let { height, index, title } = data;
    let array = [...this.state.body];
    // let curr;
    // for (let i = 0; i < height; i++) {
    //   curr = array[(index.x + i - 1) * this.props.columns + index.y];
    //   if (!(curr.type === DraggableArea)) {
    //     return;
    //   }
    // }
    let curr = null;
    for (let i = index.x; i < index.x + height; i++) {
      curr = array[(i - 1) * this.props.columns + index.y - 1];
      if (!(curr.type === DraggableArea)) {
        return;
      }
      array[(i - 1) * this.props.columns + index.y - 1] = null;
    }

    array[
      (index.x - 1) * this.props.columns + index.y - 1
    ] = this.props.createAvatar(
      {
        index: index,
        title: title,
        height: height
      },
      height
    );
    this.setState({ body: array });

    this.props.onDataUpdate(data);
  };
}

export default DragMap;
