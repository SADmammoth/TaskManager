import React from "react";
import DraggableElement from "./DraggableElement";

class DraggableArea extends React.Component {
  state = {
    swap: false
  };
  render() {
    return this.state.swap ? (
      <div>text</div>
    ) : (
      <div
        // style={{
        //   position: "absolute",
        //   width: "100%",
        //   height: "100%",
        //   left: 0,
        //   top: 0
        // }}
        onDragOver={e => {
          e.preventDefault();
        }}
        onDrop={e => {
          let taskData = JSON.parse(e.dataTransfer.getData("application/json"));
          this.props.setData({
            index: this.props.index,
            ...taskData
          });
        }}
        className={this.props.className}
        style={this.props.style}
      >
        {this.props.children}
      </div>
    );
  }

  swap = () => {
    this.setState({ swap: true });
  };
}

export default DraggableArea;
