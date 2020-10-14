import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import shortid from 'shortid';

export default function Nav({ items }) {
  return (
    <>
      {Object.keys(items).map((item) => (
        <li className="nav-item" key={shortid.generate()}>
          <Link to={items[item]}>{item}</Link>
        </li>
      ))}
    </>
  );
}

Nav.propTypes = {
  items: PropTypes.objectOf(PropTypes.string),
};
