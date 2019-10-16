import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
const shortid = require('shortid');

export default function Nav(props) {
  return (
    <>
      {Object.keys(props.items).map(item => (
        <li className="nav-item" key={shortid.generate()}>
          <Link to={props.items[item]}>{item}</Link>
        </li>
      ))}
    </>
  );
}

Nav.propTypes = {
  items: PropTypes.objectOf(PropTypes.string)
};
