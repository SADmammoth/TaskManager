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
        onDragOver={e => {
          e.preventDefault();
        }}
        onDrop={e => {
          let data = JSON.parse(e.dataTransfer.getData("application/json"));
          this.props.setData({
            index: this.props.index,
            ...data   
          });

          e.target.id = e.target.id + " dragging";
          e.target.setAttribute("dropped", true);
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
