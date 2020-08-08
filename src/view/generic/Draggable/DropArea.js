import React from 'react';

const DropArea = (props) => {
  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDrop={(e) => {
        let data = JSON.parse(e.dataTransfer.getData('application/json'));
        props.setData({
          index: props.index,
          ...data,
        });
      }}
      className={props.className}
      style={props.style}
    >
      {props.children}
    </div>
  );
};

export default DropArea;
