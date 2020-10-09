import SubscriptionController from '../controllers/SubscriptionController';

export default function notifySubscribers(req, res, message, code) {
  SubscriptionController.update(req, res);

  res.code(code).send(message);
}
