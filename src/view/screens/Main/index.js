import React from 'react';
import { Helmet } from 'react-helmet';

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
        <h1 className='h1'>Home</h1>
      </>
    );
  }
}
