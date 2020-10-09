import notifySubscribers from '../notifySubscribers';

export const patch = (router, ...args) => {
  router.patch(...args, notifySubscribers);
};
