import path from "path";

export default class Client {
  static userToken = 2233;
  static readonly apiPath = "./api/";
  static subscribed = false;
  static subscribers: Function[] = [];
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

  static async SubscribeOnDataUpdate(callback: Function) {
    Client.subscribers.push(callback);

    console.log(Client.subscribers);
    while (!Client.subscribed) {
      Client.subscribed = true;
      let response = await fetch(path.join(Client.apiPath, "/subscribe")).then(
        Client.checkStatus
      );

      Client.subscribers.forEach(cb => {
        cb();
      });
      Client.subscribed = false;
    }
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
