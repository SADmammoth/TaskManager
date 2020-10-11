import React, { useState } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import DropArea from './DropArea';
import key from '../../helpers/getBodyKey';

function DraggableList(props) {
  const [id] = useState(shortid.generate());

  return [
    <DropArea
      key={key(0, 0, id)}
      className="list-droparea"
      index={{ x: 0, y: 0 }}
      setData={(data) => {
        props.onOrderChange(data);
      }}
      checkSnap={(index, height, hovered) => hovered}
    />,
    ...props.list
      .map((item, i) => {
        if (i === props.dragging) {
          return item;
        } else {
          return [
            item,
            <DropArea
              key={key(i + 1, 0, id)}
              className="list-droparea"
              index={{ x: i + 1, y: 0 }}
              setData={(data) => {
                props.onOrderChange(data);
              }}
              checkSnap={(index, height, hovered) => hovered}
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
