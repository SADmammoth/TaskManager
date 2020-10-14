import React, { useState } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import ListDropArea from './ListDropArea';

function DraggableList({ list, onOrderChange, dragging }) {
  const [id] = useState(shortid.generate());

  return [
    <ListDropArea
      key={id + 0}
      id={id + 0}
      index={0}
      onOrderChange={onOrderChange}
    />,
    ...list
      .map((item, i) => {
        if (i === dragging) {
          return item;
        } else {
          return [
            item,
            <ListDropArea
              key={id + (i + 1)}
              id={id + (i + 1)}
              index={i + 1}
              onOrderChange={onOrderChange}
            />,
          ];
        }
      })
      .flat(),
  ];
}

DraggableList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.node, PropTypes.func]))
    .isRequired,
  insert: PropTypes.func.isRequired,
  onOrderChange: PropTypes.func.isRequired,
};

export default DraggableList;
