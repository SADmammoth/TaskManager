import React, { useCallback, useEffect, useState } from 'react';
import onDrop from './onDrop';
import drawBody from './drawBody';
import checkSnap from './checkSnap';

const DragMap = (props) => {
  const [body, setBody] = useState([]);
  const { columns, map } = props;

  useEffect(() => {
    setBody(map.flat());
  }, [JSON.stringify(map)]);

  const setData = useCallback((data) => onDrop(data, body, setBody, props), [
    JSON.stringify(body),
    setBody,
  ]);

  const checkSnapping = useCallback(
    (index, height, hovered) =>
      checkSnap(index, height, body, columns, hovered),
    [JSON.stringify(body), columns]
  );

  return <>{drawBody(body, setData, checkSnapping)}</>;
};

export default DragMap;
