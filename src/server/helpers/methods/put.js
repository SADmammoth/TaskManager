import { StatusCodes } from 'http-status-codes';
import notifySubscribers from '../notifySubscribers';

export const put = (router, ...args) => {
  router.put(...args, (req, res) =>
    notifySubscribers(StatusCodes.OK, req, res)
  );
};
