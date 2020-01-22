import React from 'react';

class DragMap extends React.Component {
  render() {
    return <>{this.props.children(this.setData)}</>;
  }

  setData = data => false;
}

export default DragMap;
