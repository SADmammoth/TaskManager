import React from "react";
import { Helmet } from "react-helmet";
import Form from "@sadmammoth/react-form";
import Client from "../../helpers/Client.ts";
import Button from "../../atomics/Button";
import textVariants from "../../atomics/TextBlock/textVariants";
import TextBlock from "../../atomics/TextBlock/TextBlock";

export default function NewTaskList(props) {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Create list</title>
      </Helmet>
      <TextBlock variant={textVariants.h1}>Create list</TextBlock>
      <Form
        onSubmit={({ title }) => {
          return Client.createList(title);
        }}
        inputs={[
          {
            type: "text",
            name: "title",
            placeholder: "Title",
            required: true,
            label: "Title",
          },
        ]}
        style={{ width: "20vw", margin: "0 auto" }}
        submitButton={<Button content="Submit" />}
      />
    </>
  );
}
