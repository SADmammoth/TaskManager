import React, { useState } from 'react';

const DropArea = (props) => {
  const [className, setClassName] = useState('');
  return (
    <div
      // onMouseOver={() => {
      //   console.log(9);
      // }}
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
      className={props.className + className}
      style={props.style}
    >
      {props.children}
    </div>
  );
};

export default DropArea;
