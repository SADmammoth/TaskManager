import React from 'react';
import { Helmet } from 'react-helmet';

export default function Error404(props) {
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
