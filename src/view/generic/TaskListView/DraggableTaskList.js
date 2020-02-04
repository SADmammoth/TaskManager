import React from "react";
import DraggableList from "../Draggable/DraggableList";
import TaskListView from "./TaskListView";

class DraggableTaskList extends TaskListView {
  constructor(props) {
    super(Object.assign(props, { draggable: true }));
  }
  render() {
    return <DraggableList>{super.render()}</DraggableList>;
  }
}

export default DraggableTaskList;
