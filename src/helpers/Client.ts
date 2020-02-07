import path from "path";
interface Subscribers {
  [key: string]: ((response?: object) => any) | undefined;
}
export default class Client {
  private static userToken = 2233;
  private static readonly apiPath = "./api/";
  private static subscribed = false;
  private static subscribers: Subscribers = {};
  private static subLoop = 0;

  static async addTask(
    task: { title: string; content: string },
    listId: number,
    callback: (response: object) => any
  ) {
    let response = await fetch(
      path.join(Client.apiPath, "/lists/", listId.toString()),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(task)
      }
    ).then(Client.checkStatus);

    let responseObject = Client.parseJSON(response);
    if (callback) callback(responseObject);
  }

  static ForceUpdate(object?: object) {
    Client.Notify(object);
  }

  private static Notify(object?: object) {
    console.log("View updated");

    Object.values(Client.subscribers).forEach(cb => !cb || cb(object));
  }

  static async SubscribeOnDataUpdate(
    path: string,
    callback: (response?: object) => any
  ) {
    Client.subscribers[path] = callback;
    Client.subLoop = 0;
    while (Client.subscribed) {
      let response = await Client.RequestSubscription();
      console.log("Subscription response");
      Client.Notify(Client.parseJSON(response));
      if (Client.subLoop > 5) {
        throw new Error("Subscription loop is overloaded");
      }
    }
  }

  static async Unsubscribe(path: string) {
    Client.subscribers[path] = undefined;
    if (Object(Client.subscribers).values.filter(el => !!el).length === 0) {
      Client.subscribed = false;
    }
  }

  private static async RequestSubscription() {
    if (Object(Client.subscribers).values.filter(el => !!el).length === 0) {
      Client.subscribed = false;
      return;
    }
    Client.subscribed = true;
    return fetch(path.join(Client.apiPath, "/subscribe"))
      .then(res => ((Client.subLoop = 0), Client.checkStatus(res)))
      .catch(e => (Client.subLoop++, console.log(e)));
  }

  static async getTasks(taskListID: number, callback: (object: object) => any) {
    let response = await fetch(
      path.join(Client.apiPath, "/lists/", taskListID.toString())
    ).then(Client.checkStatus);

    let responseObject = Client.parseJSON(response);
    if (callback) callback(responseObject);

    return new Promise((resolve, reject) => {
      resolve(responseObject);
    });
  }

  static async registerUser(login: string, password: string) {
    await fetch(path.join(Client.apiPath, "/users"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login: login, password: password })
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

  static async parseJSON(response?: Response | void) {
    if (!response) {
      return;
    }
    let res = await response.json();
    return res;
  }
}
