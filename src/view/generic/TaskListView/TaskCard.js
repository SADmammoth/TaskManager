import React from "react";
import ReactHtmlParser from "react-html-parser";

class Task extends React.Component {
  render() {
    return (
      <div
        {...this.props}
        className={"task-card " + (this.props.className || "")}
        style={this.props.style}
      >
        <p class="title">{this.props.title}</p>
        <div class="content">{ReactHtmlParser(this.props.content)}</div>
      </div>
    );
  }
}

export default Task;
