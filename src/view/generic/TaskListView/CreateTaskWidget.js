import React from "react";
import Client from "../../../helpers/Client.ts";

class CreateTaskWidget extends React.Component {
  render() {
    return <button onClick={this.createTask}>Create task</button>;
  }

  createTask = async () => {
    console.log(await Client.addTask({ title: this.props.title }));
    // Client.RequestToNotify();
    // this.props.updateTasks();
  };
}

export default CreateTaskWidget;
