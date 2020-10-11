import React, { useState } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import DropArea from './DropArea';
import key from '../../helpers/getBodyKey';

function DraggableList(props) {
  const [id] = useState(shortid.generate());

  return props.list
    .map((item, i) => [
      item,
      <DropArea
        key={key(i, 0, id)}
        className="list-droparea"
        index={{ x: i, y: 0 }}
        setData={(data) => {
          props.onOrderChange(data);
        }}
        checkSnap={(index, height, hovered) => hovered}
      />,
    ])
    .flat();
}

DraggableList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.node, PropTypes.func]))
    .isRequired,
  insert: PropTypes.func.isRequired,
  onOrderChange: PropTypes.func.isRequired,
};

export default DraggableList;
