import { create } from "domain";

export default class SubscriptionController {
  // static shouldUpdate = false;

  static promise = SubscriptionController.createPromise();
  static resolve;

  //TODO Can't promise be replaced?
  static createPromise() {
    return new Promise(async (resolve, reject) => {
      SubscriptionController.resolve = () => resolve(true);
    });
  }
  static update(req, res) {
    SubscriptionController.resolve();
    console.log("Data updated");
    if (res) {
      res.status(200);
      res.send();
    }
  }

  static async subscribe(req, res) {
    let shouldUpdate = await SubscriptionController.promise;
    if (shouldUpdate) {
      console.log("Subscriber notified");
      SubscriptionController.promise = SubscriptionController.createPromise();
      res.status(200);
      res.send();
    } else {
      res.status(500);
      res.send();
    }
  }
}