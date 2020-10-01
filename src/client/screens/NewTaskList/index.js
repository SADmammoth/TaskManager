import React from 'react';
import { Helmet } from 'react-helmet';
import Form from '@sadmammoth/react-form';
import Client from '../../../helpers/Client.ts';
import Button from '../../generic/Button';

export default class NewTaskList extends React.Component {
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
          onSubmit={({ title }) => {
            return Client.createList(title);
          }}
          inputs={[
            {
              type: 'text',
              name: 'title',
              placeholder: 'Title',
              required: true,
              label: 'Title',
            },
          ]}
          style={{ width: '20vw', margin: '0 auto' }}
          submitButton={<Button content="Submit" />}
        />
      </>
    );
  }
}
