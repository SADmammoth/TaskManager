const StatusCodes = require('http-status-codes').StatusCodes;
const notifySubscribers = require('../notifySubscribers');

exports.patch = (router, ...args) => {
  router.patch(...args, (req, res) =>
    notifySubscribers(StatusCodes.OK, req, res)
  );
};
