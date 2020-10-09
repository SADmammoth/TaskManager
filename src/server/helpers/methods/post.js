import notifySubscribers from '../notifySubscribers';

export const post = (router, ...args) => {
  router.post(...args, notifySubscribers);
};
