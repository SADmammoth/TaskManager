import React from 'react';

function Sidebar(props) {
  return (
    <>
      <aside
        className={`sidebar horizontal-stack${' ' + props.className || ''}`}
        style={props.style}
      >
        <div className="menus vertical-stack">{props.menus}</div>
        <div className="sidebar-content vertical-stack fullheight-auto">
          {props.content}
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
