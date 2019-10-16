import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../generic/Header';

export default class Main extends React.Component {
  embedValidator() {}

  embedController() {}

  render() {
    return (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Home</title>
        </Helmet>
        <Header />
        <h1>Home</h1>
      </>
    );
  }
}
