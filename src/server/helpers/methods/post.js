import { StatusCodes } from 'http-status-codes';
import notifySubscribers from '../notifySubscribers';

export const post = (router, ...args) => {
  router.post(...args, (req, res) =>
    notifySubscribers(StatusCodes.CREATED, req, res)
  );
};
