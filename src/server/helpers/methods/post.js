const StatusCodes = require('http-status-codes').StatusCodes;
const notifySubscribers = require('../notifySubscribers');

exports.post = (router, ...args) => {
  router.post(...args, (req, res) =>
    notifySubscribers(StatusCodes.CREATED, req, res)
  );
};
