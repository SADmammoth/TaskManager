import { StatusCodes } from 'http-status-codes';
import notifySubscribers from '../notifySubscribers';

export const deleteMethod = (router, ...args) => {
  router.delete(...args, (req, res) =>
    notifySubscribers(StatusCodes.OK, req, res)
  );
};
