import React, { useCallback, useEffect, useState } from 'react';
import onDrop from './onDrop';
import drawBody from './drawBody';

const DragMap = (props) => {
  let [body, setBody] = useState([]);

  useEffect(() => {
    setBody(props.map.flat());
  }, [JSON.stringify(props.map)]);

  const setData = useCallback((data) => onDrop(data, body, setBody, props), [
    JSON.stringify(body),
    setBody,
  ]);

  const checkSnap = useCallback(
    (index, height) => checkSnap(index, height, body),
    [JSON.stringify(body)]
  );

  return <>{drawBody(body, setData, checkSnap)}</>;
};

export default DragMap;
