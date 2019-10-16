import React from 'react';
import { Link, BrowserRouter as Router } from 'react-router-dom';
const shortid = require('shortid');

export default function Nav(props) {
  console.group(props);
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
