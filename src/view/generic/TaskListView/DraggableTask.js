import React from "react";
import { DraggableElement } from "../Draggable";
import TaskCard from "./TaskCard";

class DraggableTask extends TaskCard {
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
        <DraggableElement
          data={JSON.stringify({ height: 2, title: this.props.title })}
          datatype="application/json"
        >
          <p>{this.props.title}</p>
        </DraggableElement>
      </div>
    );
  }
}

export default DraggableTask;
