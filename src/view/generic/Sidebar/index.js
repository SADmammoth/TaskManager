import React from 'react';
class Sidebar extends React.Component {
  render() {
    return (
      <>
        <aside>{this.props.children}</aside>
      </>
    );
  }
}

export default Sidebar;
