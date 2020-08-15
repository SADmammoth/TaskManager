import React from 'react';
import { Helmet } from 'react-helmet';
import Form from '@sadmammoth/react-form';
import Client from '../../../helpers/Client.ts';
import Button from '../../generic/Button';

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
          onSubmit={({ list, ...data }) => {
            return Client.addTask(data, list);
          }}
          inputs={[
            {
              type: 'text',
              name: 'title',
              placeholder: 'Title',
              required: true,
              label: 'Title',
            },
            {
              type: 'textarea',
              name: 'content',
              required: false,
              label: 'Content',
            },
            {
              type: 'select',
              name: 'list',
              valueOptions: Client.getListsNames,
              required: true,
            },
            {
              type: 'number',
              name: 'duration',
              value: 1,
              required: true,
              label: 'Duration, hrs',
              attributes: { min: 1, max: 8 },
            },
          ]}
          style={{ width: '20vw', margin: '0 auto' }}
          submitButton={<Button content="Submit" />}
        />
      </>
    );
  }
}
