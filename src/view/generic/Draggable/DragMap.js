import React, { useLayoutEffect, useState } from 'react';
import DropArea from './DropArea';

const DragMap = (props) => {
  let [body, setBody] = useState([]);

  function setData(data, body) {
    let { height, index, title } = data;
    let array = [...body];
    let curr = null;
    let currentIndex = (i) => {
      return (i - 1) * props.columns + index.y - 1;
    };

    let indBuff;

    for (let i = index.x; i < index.x + height; i++) {
      indBuff = currentIndex(i);

      curr = array[indBuff];

      if (curr.type !== 'droparea') {
        return;
      }

      array[indBuff] = null;
    }

    array[currentIndex(index.x)] = {
      type: 'avatar',
      avatar: props.createAvatar(data, height),
    };

    setBody(array);
    props.onDataUpdate(data);
  }

  function checkSnap(index, height) {
    let currentIndex = (i) => {
      return (i - 1) * props.columns + index.y;
    };
    let indBuff;
    let curr;

    console.log(index, height);
    for (let i = index.x; i < index.x + height; i++) {
      console.log(currentIndex(i));
      indBuff = currentIndex(i);
      console.log(body, indBuff);
      curr = body[indBuff];
      if (curr.type !== 'droparea') {
        return false;
      }
    }
    return true;
  }

  useLayoutEffect(() => {
    setBody(props.map.flat());
  }, [props.map]);

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
        return (
          <>
            {child.avatar}
            <DropArea
              key={key}
              index={index}
              className={className + ' hidden'}
              setData={(data) => setData(data, body)}
              checkSnap={checkSnap}
            ></DropArea>
          </>
        );
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
