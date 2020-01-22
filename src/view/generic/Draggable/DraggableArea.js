import React from 'react';

class DraggableArea extends React.Component {
  render() {
    return (
      <div
        onDragOver={e => {
          e.preventDefault();
        }}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          left: 0,
          top: 0
        }}
        onDrop={e => {
          this.props.setData(
            event.dataTransfer.getData('text/plain'),
            this.props.index
          );
        }}
      >
        {this.props.children}
      </div>
    );
  }
}

export default DraggableArea;
