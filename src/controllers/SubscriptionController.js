import { create } from "domain";

export default class SubscriptionController {
  static shouldUpdate = false;

  static promise = SubscriptionController.createPromise();

  static createPromise() {
    return new Promise(async (resolve, reject) => {
      setInterval(() => {
        if (SubscriptionController.shouldUpdate) resolve(true);
      }, 10);
    });
  }
  static update(req, res) {
    SubscriptionController.shouldUpdate = true;
    console.log("Data updated");
    if (res) {
      res.status(200);
      res.send();
    }
  }

  static async subscribe(req, res) {
    SubscriptionController.shouldUpdate = await SubscriptionController.promise;
    if (SubscriptionController.shouldUpdate) {
      console.log("Subscriber notified");
      SubscriptionController.promise = SubscriptionController.createPromise();
      SubscriptionController.shouldUpdate = false;
      res.status(200);
      res.send();
    } else {
      res.status(500);
      res.send();
    }
  }
}
