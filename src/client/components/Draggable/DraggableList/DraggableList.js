import React, { useState } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import DropArea from '../DropArea';
import key from '../../../helpers/getBodyKey';
import ListDropArea from './ListDroparea';

function DraggableList({ list, onOrderChange, dragging }) {
  const [id] = useState(shortid.generate());

  return [
    <ListDropArea key={id} id={id} index={0} onOrderChange={onOrderChange} />,
    ...list
      .map((item, i) => {
        if (i === dragging) {
          return item;
        } else {
          return [
            item,
            <ListDropArea
              key={id}
              id={id}
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
