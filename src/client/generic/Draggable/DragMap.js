import React, { useEffect, useState } from 'react';
import toLinearIndex from '../../../helpers/toLinearIndex';
import DropArea from './DropArea';

const DragMap = (props) => {
  let [body, setBody] = useState([]);

  function setData(data, body) {
    let { height, index, title } = data;
    let array = [...body];
    let curr = null;

    let indBuff;

    for (let i = index.x; i < index.x + height; i++) {
      indBuff = toLinearIndex({ x: i, y: index.y }, props.columns);

      curr = array[indBuff];

      if (curr.type !== 'droparea') {
        return;
      }

      array[indBuff] = { ...array[indBuff], type: 'hidden' };
    }

    array[toLinearIndex(index)] = {
      type: 'avatar',
      avatar: props.createAvatar(data, height),
    };

    setBody(array);
    props.onDataUpdate(data);
  }

  function checkSnap(index, height) {
    let indBuff;
    let curr;

    for (let i = index.x; i < index.x + height; i++) {
      indBuff = toLinearIndex({ x: i, y: index.y }, props.columns);
      curr = body[indBuff];
      if (curr.type !== 'droparea') {
        return false;
      }
    }
    return true;
  }

  useEffect(() => {
    setBody(props.map.flat());
  }, [JSON.stringify(props.map)]);

  let drawBody = () => {
    return body.map((child) => {
      if (!child) {
        return child;
      }
      let { type, key, index, className } = child;

      if (type === 'hidden') {
        return (
          <DropArea
            key={key}
            index={index}
            className={className + ' hidden'}
            setData={(data) => setData(data, body)}
            checkSnap={checkSnap}
          ></DropArea>
        );
      }
      if (type === 'avatar') {
        return child.avatar;
      } else if (type === 'droparea') {
        return (
          <DropArea
            key={key}
            index={index}
            className={className}
            setData={(data) => setData(data, body)}
            checkSnap={checkSnap}
          ></DropArea>
        );
      } else {
        return child;
      }
    });
  };

  return <>{drawBody()}</>;
};

export default DragMap;
