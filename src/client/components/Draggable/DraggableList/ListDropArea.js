import React from 'react';
import DropArea from '../DropArea';
import key from '../../../helpers/getBodyKey';

const ListDropArea = ({ index, id, onOrderChange }) => {
  return (
    <DropArea
      key={key(index, 0, id)}
      className="list-droparea"
      index={{ x: index, y: 0 }}
      setData={(data) => {
        onOrderChange(data);
      }}
      checkSnap={(index, height, hovered) => hovered}
    />
  );
};

export default ListDropArea;
