import React, { useRef } from 'react';
import PropTypes from 'prop-types';

const DropArea = (props) => {
  const droparea = useRef({});

  return (
    <div
      ref={droparea}
      onDragOver={(e) => {
        e.preventDefault();
        let dragging = document.getElementById('dragging');

        if (
          props.checkSnap &&
          dragging &&
          !dragging.hasAttribute('data-snap') &&
          props.checkSnap(
            props.index,
            parseInt(dragging.getAttribute('data-height'))
          )
        ) {
          let { left, top } = droparea.current.getBoundingClientRect();

          dragging.setAttribute(
            'data-snap',
            `${left + window.scrollX},${top + window.scrollY}`
          );
        }
      }}
      onDragLeave={() => {
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

DropArea.propTypes = {
  style: PropTypes.shape({ x: PropTypes.number, y: PropTypes.number }),
  className: PropTypes.string,
  index: PropTypes.objectOf(PropTypes.number).isRequired,
  checkSnap: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  setData: PropTypes.func.isRequired,
};

export default DropArea;
