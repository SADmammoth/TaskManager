import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../generic/Header';

export default class AddTask extends React.Component {
  embedValidator() {}

  embedController() {}

  render() {
    return (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>AddTask</title>
        </Helmet>
        <Header />
        <h1>Hello</h1>
      </>
    );
  }
}
