import React from "react";
import { Helmet } from "react-helmet";
import Form from "../../generic/Form";
import Client from "../../../helpers/Client.ts";
import Button from "../../generic/Button";

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
          onSubmit={data => {Client.addTask(data, 0);
          }}
          inputs={[
            {
              type: "text",
              name: "title",
              description: "Title",
              required: true,
              label: "Title"
            },
            {
              type: "textarea",
              name: "content",
              description: "HTML content",
              required: false,
              label: "Content"
            },
            {
              type: "number",
              name: "duration",
              description: "Duration, hrs",
              required: true,
              label: "Duration, hrs",
              attributes: { min: 1, max: 8, value: 1 }
            }
          ]}
          style={{ width: "20vw", margin: "0 auto" }}
          submitButton={<Button content="Submit" />}
        />
      </>
    );
  }
}
