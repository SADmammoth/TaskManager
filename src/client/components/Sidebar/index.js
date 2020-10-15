import React from 'react';
import PropTypes from 'prop-types';

function Sidebar({ className, style, menus, content }) {
  return (
    <>
      <aside
        className={`sidebar horizontal-stack${' ' + className || ''}`}
        style={style}
      >
        {menus || <div className="menus vertical-stack">{menus}</div>}
        <div className="sidebar-content vertical-stack fullheight-auto">
          {content}
        </div>
      </aside>
    </>
  );
}

Sidebar.propTypes = {
  className: PropTypes.string,
  style: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ),
  menus: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.node, PropTypes.func])
  ),
  content: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
};

export default Sidebar;
