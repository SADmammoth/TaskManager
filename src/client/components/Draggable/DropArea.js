import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

const DropArea = (props) => {
  const droparea = useRef({});
  const [hovered, setHovered] = useState(false);

  const { checkSnap, index, setData, className, style, children } = props;

  const onDragOver = (e) => {
    setHovered(true);
    e.preventDefault();
    let dragging = document.getElementById('dragging');

    if (
      checkSnap &&
      dragging &&
      !dragging.hasAttribute('data-snap') &&
      checkSnap(index, parseInt(dragging.getAttribute('data-height')), hovered)
    ) {
      let { left, top } = droparea.current.getBoundingClientRect();

      console.log(
        left,
        window.scrollX,
        parseInt(getComputedStyle(droparea.current).paddingLeft)
      );
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
    console.log(0);
    setHovered(false);
    let dragging = document.getElementById('dragging');
    if (dragging) dragging.removeAttribute('data-snap');
  };

  const onDrop = (e) => {
    setHovered(false);
    let data = JSON.parse(e.dataTransfer.getData('application/json'));
    setData({
      index,
      ...data,
    });
  };

  return (
    <div
      ref={droparea}
      className={`${className}${hovered ? ' hovered' : ''}`}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      style={style}
    >
      {children}
    </div>
  );
};

DropArea.propTypes = {
  className: PropTypes.string,
  index: PropTypes.shape({ x: PropTypes.number, y: PropTypes.number })
    .isRequired,
  setData: PropTypes.func.isRequired,
  checkSnap: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  style: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ),
};

export default DropArea;
