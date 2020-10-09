import SubscriptionController from '../controllers/SubscriptionController';

export default function notifySubscribers(code, req, res) {
  SubscriptionController.update(req, res);
  res.send('Request successful');
}
