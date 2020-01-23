import React from "react";

class DraggableElement extends React.Component {
  render() {
    return (
      <div
        className="draggable"
        draggable="true"
        onDragStart={e =>
          e.dataTransfer.setData(this.props.datatype, this.props.data)
        }
      >
        {this.props.children}
      </div>
    );
  }
}

export default DraggableElement;
