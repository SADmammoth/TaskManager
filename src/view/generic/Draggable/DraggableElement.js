import React from "react";
import propTypes from "prop-types";
import ReactDOM from "react-dom";

class DraggableElement extends React.Component {
  lastPos = { x: null, y: null };
  dragging = null;
  static dropped = false;

  dragProcess = e => {
    function getnums(str) {
      return parseInt(str.match(/[0-9]*/)[0]);
    }
    if (this.dragging) {
      this.dragging.style.left =
        getnums(this.dragging.style.left) + e.clientX - this.lastPos.x + "px";
      this.lastPos.x = e.clientX;
      this.dragging.style.top =
        getnums(this.dragging.style.top) + e.clientY - this.lastPos.y + "px";
      this.lastPos.y = e.clientY;
    }
  };

  dragAbort = e => {
    document.getElementById("dragging").id = this.oldId;
    this.dragging.style.pointerEvents = "auto";
    this.dragging.style.position = "static";
    this.dragging.style.left = undefined;
    this.dragging.style.top = undefined;
    this.dragging = null;
    this.lastPos.y = null;
    this.lastPos.x = null;
    document
      .getElementById("root")
      .removeEventListener("drag", this.dragProcess);
    document
      .getElementById("root")
      .removeEventListener("dragend", this.dragEnd);
  };

  dragEnd = e => {
    if (
      this.dragging &&
      document.getElementById("dragging").getAttribute("dropped")
    ) {
      document.getElementById("dragging").removeAttribute("dropped");

      document.getElementById("dragging").id = this.oldId;
      this.dragging.style.pointerEvents = "auto";
      this.dragging.style.display = "none";
      this.dragging = null;
      this.lastPos.y = null;
      this.lastPos.x = null;
      document
        .getElementById("root")
        .removeEventListener("drag", this.dragProcess);
      document
        .getElementById("root")
        .removeEventListener("dragend", this.dragEnd);
    } else {
      this.dragAbort(e);
    }
  };

  render() {
    return (
      <div
        className="draggable"
        draggable="true"
        onDragStart={e => {
          this.oldId = e.currentTarget.id;
          e.currentTarget.id = "dragging" + this.oldId;
          console.log(e.currentTarget);
          e.dataTransfer.setDragImage(document.createElement("div"), 0, 0);
          e.dataTransfer.setData(
            this.props.datatype,
            JSON.stringify(this.props.data)
          );
        }}
        onMouseDown={e => {
          this.dragging = e.currentTarget;
          e.currentTarget.style.position = "absolute";
          this.lastPos.x =
            e.clientX + e.currentTarget.getBoundingClientRect().width / 2;
          e.currentTarget.style.left = e.clientX + "px";
          this.lastPos.y =
            e.clientY + e.currentTarget.getBoundingClientRect().height / 2;
          e.currentTarget.style.top = e.clientY + "px";
          document
            .getElementById("root")
            .addEventListener("mouseup", this.mouseUp);
          document
            .getElementById("root")
            .addEventListener("dragend", this.dragEnd);
          document
            .getElementById("root")
            .addEventListener("drag", this.dragProcess);
          e.currentTarget.style.pointerEvents = "none";
        }}
      >
        {this.props.children}
      </div>
    );
  }
}

export default DraggableElement;
