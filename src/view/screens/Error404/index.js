import React from 'react';
import { Helmet } from 'react-helmet';

class Error404 extends React.Component {
  embedValidator() {}

  embedController() {}

  render() {
    return (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>404</title>
        </Helmet>
        <h1>404</h1>
      </>
    );
  }
}
export default Error404;
