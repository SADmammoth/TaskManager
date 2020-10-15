import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function Nav({ items }) {
  return (
    <>
      {Object.entries(items).map(([name, path]) => (
        <li className="nav-item" key={path}>
          <Link to={path}>{name}</Link>
        </li>
      ))}
    </>
  );
}

Nav.propTypes = {
  items: PropTypes.objectOf(PropTypes.string),
};

export default Nav;
