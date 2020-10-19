const StatusCodes = require('http-status-codes').StatusCodes;
const notifySubscribers = require('../notifySubscribers');

exports.put = (router, ...args) => {
  router.put(...args, (req, res) =>
    notifySubscribers(StatusCodes.OK, req, res)
  );
};
