const StatusCodes = require('http-status-codes').StatusCodes;
const notifySubscribers = require('../notifySubscribers');

exports.deleteMethod = (router, ...args) => {
  router.delete(...args, (req, res) =>
    notifySubscribers(StatusCodes.OK, req, res)
  );
};
