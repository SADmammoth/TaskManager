import React from "react";
import { DraggableElement } from "../Draggable";
import TaskCard from "./TaskCard";
import Task from "./TaskCard";
import TaskAvatar from "./TaskAvatar";

class DraggableTask extends React.Component {
  render() {
    console.log(this.props);
    return (
      <DraggableElement
        data={{
          taskId: this.props.taskId,
          listId: this.props.listId,
          height: this.props.duration,
          title: this.props.title
        }}
        datatype="application/json"
        avatar={TaskAvatar}
      >
        <TaskCard {...this.props}></TaskCard>
      </DraggableElement>
    );
  }
}

export default DraggableTask;
