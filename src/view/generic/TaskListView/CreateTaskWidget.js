import React from "react";

class CreateTaskWidget extends React.Component {
  render() {
    return <button onClick={this.props.createTask}>Create task</button>;
  }
}

export default CreateTaskWidget;
