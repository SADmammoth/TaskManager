import React, { useLayoutEffect, useState } from 'react';
import DropArea from './DropArea';

const DragMap = (props) => {
  let [body, setBody] = useState([]);

  function setData(data, body) {
    let { height, index, title } = data;
    console.log(body);
    let array = [...body];
    let curr = null;
    let currentIndex = (i) => {
      return (i - 1) * props.columns + index.y - 1;
    };

    let indBuff;

    for (let i = index.x; i < index.x + height; i++) {
      indBuff = currentIndex(i);
      console.log(array, indBuff);
      curr = array[indBuff];

      if (curr.type !== 'droparea') {
        return;
      }

      array[indBuff] = null;
    }

    array[currentIndex(index.x)] = {
      type: 'avatar',
      avatar: props.createAvatar(
        {
          index,
          title,
        },
        height
      ),
    };

    setBody(array);
    props.onDataUpdate(data);
  }

  useLayoutEffect(() => {
    setBody(props.map.flat());
  }, [props.map]);

  let drawBody = () => {
    return body.map((child) => {
      if (!child) {
        return child;
      }
      let { type } = child;
      console.log(type, child);
      if (type === 'avatar') {
        return child.avatar;
      } else if (type === 'droparea') {
        let { key, index, className } = child;
        return (
          <DropArea
            key={key}
            index={index}
            className={className}
            setData={(data) => setData(data, body)}
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
