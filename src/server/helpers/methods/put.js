import notifySubscribers from '../notifySubscribers';

export const put = (router, ...args) => {
  router.put(...args, notifySubscribers);
};
