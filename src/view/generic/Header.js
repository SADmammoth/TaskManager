import React from 'react';
import Nav from './Nav';

export default function Header(props) {
  return (
    <>
      <header>
        <div className="logo">
          <img src="" alt="" title="" />
        </div>
        <p className="sitename">TaskManager</p>
        <nav className="header-nav">
          <ul>
            <Nav items={{ Main: '/', AddTask: '/add' }}></Nav>
          </ul>
        </nav>
      </header>
    </>
  );
}
