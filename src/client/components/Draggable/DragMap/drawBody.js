import React from 'react';
import DropArea from '../DropArea';

export default function drawBody(body, setData, checkSnap) {
  return body.map((child) => {
    if (!child) {
      return child;
    }

    let { type, key, index } = child;

    if (type === 'avatar') {
      return child.avatar;
    } else if (type === 'droparea' || type === 'hidden') {
      return (
        <DropArea
          key={key}
          index={index}
          className={`className${type === 'hidden' && ' hidden'}`}
          setData={setData}
          checkSnap={checkSnap}
        ></DropArea>
      );
    } else {
      return child;
    }
  });
}
