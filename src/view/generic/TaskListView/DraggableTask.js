import React from "react";
import { DraggableElement } from "../Draggable";
import TaskCard from "./TaskCard";
import Task from "./TaskCard";

class DraggableTask extends React.Component {
  render() {
    return (
      <DraggableElement
        data={{
          taskId: this.props.taskId,
          listId: this.props.listId,
          height: 2,
          title: this.props.title
        }}
        datatype="application/json"
      >
        <TaskCard {...this.props}></TaskCard>
      </DraggableElement>
    );
  }
}

export default DraggableTask;
