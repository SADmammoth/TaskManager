import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

const DropArea = (props) => {
  const droparea = useRef({});
  const [hovered, setHovered] = useState(false);

  const onDragOver = (e) => {
    setHovered(true);
    e.preventDefault();
    let dragging = document.getElementById('dragging');

    if (
      props.checkSnap &&
      dragging &&
      !dragging.hasAttribute('data-snap') &&
      props.checkSnap(
        props.index,
        parseInt(dragging.getAttribute('data-height')),
        hovered
      )
    ) {
      let { left, top } = droparea.current.getBoundingClientRect();

      dragging.setAttribute(
        'data-snap',
        `${
          left +
          window.scrollX +
          parseInt(getComputedStyle(droparea.current).paddingLeft)
        },${
          top +
          window.scrollY +
          parseInt(getComputedStyle(droparea.current).paddingTop)
        }`
      );
    }
  };

  const onDragLeave = () => {
    setHovered(false);
    let dragging = document.getElementById('dragging');
    if (dragging) dragging.removeAttribute('data-snap');
  };

  const onDrop = (e) => {
    setHovered(false);
    let data = JSON.parse(e.dataTransfer.getData('application/json'));
    props.setData({
      index: props.index,
      ...data,
    });
  };

  return (
    <div
      ref={droparea}
      className={`${props.className}${hovered ? ' hovered' : ''}`}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
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
