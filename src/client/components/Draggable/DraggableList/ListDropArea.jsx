import React from 'react';
import DropArea from '../DropArea';
import key from '../../../helpers/getBodyKey';
import PropTypes from 'prop-types';

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

ListDropArea.propTypes = {
  index: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  onOrderChange: PropTypes.func.isRequired,
};

export default ListDropArea;
