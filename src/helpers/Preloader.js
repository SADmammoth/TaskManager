import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Client from './Client.ts';

function Preloader(props) {
  let token = localStorage.getItem('token');
  if (token) Client.addToken(token);

  return <>{props.children}</>;
}

Preloader.propTypes = {};

export default Preloader;
