import React from "react";
import { Helmet } from "react-helmet";
import Form from "../../generic/Form";
import Client from "../../../helpers/Client.ts";

export default class CreateTaskPage extends React.Component {
  embedValidator() {}

  embedController() {}

  render() {
    return (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Create CreateTaskPage</title>
        </Helmet>
        <h1 className="h1">Create task</h1>
        <Form
          onSubmit={data => {
            console.log(data), Client.addTask(data, 0);
          }}
          inputs={[
            {
              type: "text",
              name: "title",
              description: "Username",
              required: true
            },
            {
              type: "textarea",
              name: "content",
              description: "HTML content",
              required: false
            }
          ]}
        />
      </>
    );
  }
}
