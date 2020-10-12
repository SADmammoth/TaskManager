import React from 'react';
import { Helmet } from 'react-helmet';
import Form from '@sadmammoth/react-form';
import '@sadmammoth/react-form/dist/index.css';

import Client from '../../helpers/Client.ts';
import Button from '../../components/Button';

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
              id: 'title',
              type: 'text',
              name: 'title',
              placeholder: 'Title',
              required: false,
              label: 'Title',
            },
            {
              id: 'content',
              type: 'markdown',
              name: 'content',
              required: false,
              label: 'Content',
              editable: true,
            },
            {
              id: 'list',
              type: 'select',
              name: 'list',
              valueOptions: Client.getListsNames,
              required: false,
            },
            {
              id: 'duration',
              type: 'number',
              name: 'duration',
              value: 1,
              required: false,
              label: 'Duration, hrs',
              attributes: { min: 1, max: 8, step: 0.5 },
            },
          ]}
          style={{ width: '20vw', margin: '0 auto' }}
          submitButton={<Button content="Submit" />}
        />
      </>
    );
  }
}
