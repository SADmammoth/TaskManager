import React from 'react';

class DraggableElement extends React.Component {
  render() {
    return (
      <div
        className='draggable'
        draggable='true'
        onDragStart={e => e.dataTransfer.setData('text/plain', 'text')}
      >
        {this.props.children}
      </div>
    );
  }
}

export default DraggableElement;
