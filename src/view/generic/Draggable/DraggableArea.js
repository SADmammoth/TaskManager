import React from "react";

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
        // style={{
        //   position: "absolute",
        //   width: "100%",
        //   height: "100%",
        //   left: 0,
        //   top: 0
        // }}
        onDrop={e => {
          let taskData = JSON.parse(
            event.dataTransfer.getData("application/json")
          );
          this.props.setData({
            index: this.props.index,
            height: taskData.height,
            title: taskData.title
          });
        }}
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
