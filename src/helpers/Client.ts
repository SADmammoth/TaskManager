import path from "path";

export default class Client {
  private static userToken = 2233;
  private static readonly apiPath = "./api/";
  private static subscribed = false;
  private static subscribers: Function[] = [];
  private static subLoop = 0;
  static async addTask(
    task: { title: string },
    callback: (object: object) => any
  ) {
    let response = await fetch(path.join(Client.apiPath, "/tasks"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(task)
    }).then(Client.checkStatus);

    let responseObject = Client.parseJSON(response);
    if (callback) callback(responseObject);

    return new Promise((resolve, reject) => {
      resolve(responseObject);
    });
  }

  static ForceUpdate() {
    Client.Notify();
  }

  private static Notify() {
    console.log("View updated");
    Client.subscribers.forEach(cb => {
      cb();
    });
  }

  static async SubscribeOnDataUpdate(callback: Function) {
    Client.subscribers.push(callback);
    Client.subLoop = 0;
    while (!Client.subscribed) {
      let response = await Client.RequestSubscription();
      console.log("Subscription response");
      Client.Notify();
      Client.subscribed = false;
      if (Client.subLoop > 5) {
        throw new Error("Subscription loop is overloaded");
      }
    }
  }

  private static async RequestSubscription() {
    Client.subscribed = true;
    return fetch(path.join(Client.apiPath, "/subscribe"))
      .then(res => ((Client.subLoop = 0), Client.checkStatus(res)))
      .catch(e => (Client.subLoop++, console.log(e)));
  }

  static async getTasks(taskListID: number, callback: (object: object) => any) {
    let response = await fetch(
      path.join(Client.apiPath, "/tasks/", taskListID.toString())
    ).then(Client.checkStatus);

    let responseObject = Client.parseJSON(response);
    if (callback) callback(responseObject);

    return new Promise((resolve, reject) => {
      resolve(responseObject);
    });
  }

  static checkStatus(response: Response) {
    if (response.ok) {
      return response;
    }
    throw new Error(
      "Status code " + response.status + ": " + response.statusText
    );
  }

  static async parseJSON(response: Response) {
    return JSON.parse(await response.json());
  }
}
