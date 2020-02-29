import React from "react";
import propTypes from "prop-types";
import ReactDOM from "react-dom";
import shortid from "shortid";

class DraggableElement extends React.Component {
  lastPos = { x: null, y: null };
  dragging = null;
  static dropped = false;

  dragProcess = e => {
    function getnums(str) {
      return parseInt(str.match(/[0-9]*/)[0]);
    }
    if (this.dragging) {
      console.log("drag");
      this.dragging.style.left =
        getnums(this.dragging.style.left) + e.clientX - this.lastPos.x + "px";
      this.lastPos.x = e.clientX;
      this.dragging.style.top =
        getnums(this.dragging.style.top) + e.clientY - this.lastPos.y + "px";
      this.lastPos.y = e.clientY;
    }
  };

  dragAbort = e => {
    console.log("abort");
    document.getElementById("dragging").id = this.oldId;
    this.dragging.style.pointerEvents = "auto";
    this.dragging.style.position = "static";
    this.dragging.style.left = undefined;
    this.dragging.style.top = undefined;
    this.dragging = null;
    this.lastPos.y = null;
    this.lastPos.x = null;
    // document
    //   .getElementById("root")
    //   .removeEventListener("drag", this.dragProcess);
    // document
    //   .getElementById("root")
    //   .removeEventListener("dragend", this.dragEnd);
    // e.currentTarget.removeEventListener("mousedown", this.mouseDown);
  };

  dragEnd = e => {
    console.log("dragend");
    if (
      this.dragging &&
      document.getElementById("dragging").getAttribute("dropped")
    ) {
      document.getElementById("dragging").removeAttribute("dropped");

      document.getElementById("dragging").id = this.oldId;
      this.dragging.hidden = false;
      // document
      //   .getElementById("root")
      //   .removeEventListener("drag", this.dragProcess);
      // document
      //   .getElementById("root")
      //   .removeEventListener("dragend", this.dragEnd);
      // e.currentTarget.removeEventListener("mousedown", this.mouseDown);
    } else {
      this.dragAbort(e);
    }
  };

  mouseDown = e => {
    this.dragging.style.position = "absolute";
    this.lastPos.x = e.pageX;
    this.dragging.style.left = this.lastPos.x + "px";
    this.lastPos.y = e.pageY;
    this.dragging.style.top = this.lastPos.y + "px";
    document.getElementById("root").addEventListener("mouseup", this.dragAbort);
    document.getElementById("root").addEventListener("dragend", this.dragEnd);
    document
      .getElementById("root")
      .addEventListener("mousemove", this.dragProcess);
  };

  convertToHtml(component) {
    let div = document.createElement("div");
    ReactDOM.render(component, div);
    return div.children[0];
  }

  render() {
    let Avatar = this.props.avatar;
    return (
      <div
        className="draggable"
        draggable="false"
        onMouseDown={e => {
          console.log("dragstart");
          this.oldId = e.currentTarget.id;
          e.currentTarget.id = "dragging" + this.oldId;
          this.dragging = e.currentTarget;
          this.dragging.style.position = "absolute";
          this.lastPos.x = e.pageX;
          this.dragging.style.left =
            this.dragging.getBoundingClientRect().left + "px";
          this.lastPos.y = e.pageY;
          this.dragging.style.top =
            this.dragging.getBoundingClientRect().top + "px";
          e.preventDefault();
        }}
        onMouseMove={this.dragProcess}
        onMouseUp={this.dragEnd}
      >
        {this.props.children}
      </div>
    );
  }
}

export default DraggableElement;
