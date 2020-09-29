import React from 'react';
import Menu from '../Menu';
class Sidebar extends React.Component {
  render() {
    return (
      <>
        <aside
          className={'sidebar horizontal-stack ' + (this.props.className || '')}
          style={this.props.style}
        >
          <div class="menus vertical-stack">
            {React.Children.map(this.props.children, (child) =>
              child.type === Menu ? child : null
            )}
          </div>
          <div class="sidebar-content vertical-stack fullheight-auto">
            {React.Children.map(this.props.children, (child) =>
              child.type !== Menu ? child : null
            )}
          </div>
        </aside>
      </>
    );
  }
}

export default Sidebar;
