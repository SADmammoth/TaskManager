const SubscriptionController = require('../controllers/SubscriptionController');

module.exports = function notifySubscribers(code, req, res) {
  SubscriptionController.update(req, res);
  res.send('Request successful');
};
