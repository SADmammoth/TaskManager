import React from "react";

class TaskAvatar extends React.Component {
  render() {
    return (
      <div
        className={"task-avatar " + (this.props.className || "")}
        style={Object.assign(
          { "--height": this.props.height },
          this.props.style
        )}
      >
        <p className="title">{this.props.title}</p>
      </div>
    );
  }
}
export default TaskAvatar;
