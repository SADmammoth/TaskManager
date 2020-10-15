import { useState } from 'react';
import Client from './Client.ts';

export default function useSubscription(currentLocation, onUpdate) {
  const [location, setLocation] = useState(currentLocation);
  const subscribe = (currentLocation) => {
    setLocation(currentLocation);
    Client.SubscribeOnDataUpdate(currentLocation, onUpdate);
  };

  const unsubscribe = () => {
    Client.Unsubscribe(location);
  };

  return [subscribe, unsubscribe];
}
