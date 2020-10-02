import React, { useRef, useState } from 'react';

const DropArea = (props) => {
  const droparea = useRef({});
  return (
    <div
      ref={droparea}
      // onMouseOver={() => {
      //   console.log(9);
      // }}
      onDragOver={(e) => {
        e.preventDefault();
        let dragging = document.getElementById('dragging');

        if (
          !dragging.hasAttribute('data-snap') &&
          props.checkSnap(
            props.index,
            parseInt(dragging.getAttribute('data-height'))
          )
        ) {
          let { left, top } = droparea.current.getBoundingClientRect();

          dragging.setAttribute('data-snap', `${left},${top}`);
        }
      }}
      onDragLeave={(e) => {
        let dragging = document.getElementById('dragging');
        if (dragging) dragging.removeAttribute('data-snap');
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
