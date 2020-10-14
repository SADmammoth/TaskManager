import React from 'react';
import { withRouter } from 'react-router-dom';
import Nav from './Nav';
import Clock from './Clock';

function Header(props) {
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
        {props.location && props.location.pathname !== '/404-error-page' ? (
          <Clock />
        ) : (
          ''
        )}
      </header>
    </>
  );
}

export default withRouter(Header);
