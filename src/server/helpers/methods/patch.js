import { StatusCodes } from 'http-status-codes';
import notifySubscribers from '../notifySubscribers';

export const patch = (router, ...args) => {
  router.patch(...args, (req, res) =>
    notifySubscribers(StatusCodes.OK, req, res)
  );
};
