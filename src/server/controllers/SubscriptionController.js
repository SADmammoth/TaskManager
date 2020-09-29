export default class SubscriptionController {
  // static shouldUpdate = false;

  static promises = {};
  static triggers = {};

  static createPromise(userId) {
    SubscriptionController.promises[userId] = new Promise((resolve, reject) => {
      SubscriptionController.triggers[userId] = () => resolve(true);
    });
  }
  static removePromise(userId) {
    SubscriptionController.promises[userId] = undefined;
    SubscriptionController.triggers[userId] = undefined;
  }
  static update(req, res) {
    let userId;
    if (res) {
      userId = req.user._id;
    } else {
      userId = req;
    }

    if (SubscriptionController.triggers[userId])
      SubscriptionController.triggers[userId]();
    console.log('Data updated');

    // if (res) {
    //   res.status(200);
    //   res.send();
    // }
  }

  static async subscribe(req, res) {
    let {
      user: { _id: userId },
    } = req;

    SubscriptionController.createPromise(userId);
    let shouldUpdate = await SubscriptionController.promises[userId];
    req.on('close', function (err) {
      console.log('Subscription cancelled');
      SubscriptionController.removePromise(userId);
    });

    if (shouldUpdate) {
      console.log('Subscriber notified');
      SubscriptionController.removePromise(userId);
      res.status(200);
      res.json({ dataUpdated: true });
    } else {
      res.status(500);
      res.json({ dataUpdated: true });
    }
  }
}
