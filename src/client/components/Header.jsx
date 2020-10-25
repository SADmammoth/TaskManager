import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Nav from './Nav';
import Clock from './Clock';

function Header({ location }) {
  return (
    <>
      <header>
        <div className="logo">
          <img src="" alt="" title="" />
        </div>
        <p className="sitename">TaskManager</p>
        <nav className="header-nav">
          <ul>
            <Nav
              items={{
                Main: '/',
                'Add Task': '/add',
                'New List': '/list',
                Login: '/login',
              }}
            ></Nav>
          </ul>
        </nav>
        {location && location.pathname !== '/404-error-page' ? <Clock /> : ''}
      </header>
    </>
  );
}

Header.propTypes = {
  location: PropTypes.shape({
    location: PropTypes.string,
  }).isRequired,
};

export default withRouter(Header);
