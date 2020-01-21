import React from 'react';
import { Helmet } from 'react-helmet';

export default class CreateTaskPage extends React.Component {
  embedValidator() {}

  embedController() {}

  render() {
    return (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>AddTask</title>
        </Helmet>
        <h1 className="h1">Hello</h1>
      </>
    );
  }
}
