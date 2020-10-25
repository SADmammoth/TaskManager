import { useState } from 'react';
import Client from './Client';

export default function useSubscription(currentLocation, onUpdate) {
  const [location, setLocation] = useState(currentLocation);
  const subscribe = (currentLocation) => {
    setLocation(currentLocation);
    Client.subscribeOnDataUpdate(currentLocation, onUpdate);
  };

  const unsubscribe = () => {
    Client.unsubscribe(location);
  };

  return [subscribe, unsubscribe];
}
