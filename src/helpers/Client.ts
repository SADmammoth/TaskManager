import path from "path";
import { ITask } from "../model/entities/Task";

interface Subscribers {
  [key: string]: ((response?: object) => any) | undefined;
}
export default class Client {
  private static userToken = 2233;
  private static readonly apiPath = "./api/";
  private static subscribed = false;
  private static subscribers: Subscribers = {};
  private static subLoop = 0;
  private static abortController = new AbortController();
  private static signal = Client.abortController.signal;
  private static headers = { Authorization: "" };

  static addToken(token: string) {
    let cleanToken = token.replace("JWT ", "");
    Client.headers.Authorization = `bearer ${cleanToken}`;
    localStorage.setItem("token", cleanToken);
  }

  static async changeTask(
    task: object,
    listId: number,
    taskId: number,
    callback: (response: object) => any
  ) {
    let response = await fetch(
      path.join(Client.apiPath, "lists", listId.toString(), taskId.toString()),
      {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...Client.headers },
        body: JSON.stringify(task),
      }
    )
      .then(Client.checkStatus)
      .then(callback);
  }

  static async addTask(
    task: object,
    listId: number,
    callback: (response: object) => any
  ) {
    let response = await fetch(
      path.join(Client.apiPath, "lists", listId.toString()),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...Client.headers,
        },
        body: JSON.stringify(task),
      }
    )
      .then(Client.checkStatus)
      .then(callback);
  }

  static ForceUpdate(object?: object) {
    Client.Notify(object);
  }

  private static Notify(object?: object) {
    console.log("View updated");

    Object.values(Client.subscribers).forEach((cb) => !cb || cb(object));
  }

  static async SubscribeOnDataUpdate(
    path: string,
    callback: (response?: object) => any
  ) {
    Client.subscribers[path] = callback;
    Client.subLoop = 0;
    Client.subscribed = true;
    while (Client.subscribed) {
      let response = await Client.RequestSubscription((res) =>
        Client.Notify(Client.parseJSON(res))
      );
      if (Client.subLoop > 5) {
        throw new Error("Subscription loop is overloaded");
      }
    }
  }

  static async Unsubscribe(path: string) {
    console.log("Unsubscribed");
    Client.subscribers[path] = undefined;
    if (Object.values(Client.subscribers).filter((el) => !!el).length === 0) {
      Client.subscribed = false;
      Client.abortController.abort();
      Client.abortController = new AbortController();
      Client.signal = Client.abortController.signal;
    }
    console.log(Client.subscribers);
  }

  private static async RequestSubscription(onSuccess: (res: Response) => any) {
    if (Object.values(Client.subscribers).filter((el) => !!el).length === 0) {
      Client.subscribed = false;
      return;
    }
    Client.subscribed = true;

    console.log("Subscribed");
    return fetch(path.join(Client.apiPath, "/subscribe"), {
      signal: Client.signal,
      headers: { ...Client.headers },
    })
      .then((res) => ((Client.subLoop = 0), Client.checkStatus(res)))
      .then(onSuccess)
      .catch((e) => (Client.subLoop++, console.log(e)));
  }

  static async getTasks(taskListID: number, callback: (object: object) => any) {
    let response = await fetch(
      path.join(Client.apiPath, "/lists/", taskListID.toString()),
      {
        headers: { ...Client.headers },
      }
    ).then(Client.checkStatus);

    let responseObject = Client.parseJSON(response);
    if (callback) callback(responseObject);
    return new Promise((resolve, reject) => {
      resolve(responseObject);
    });
  }

  static async getAllTasks(callback: (object: object) => any) {
    let response = await fetch(path.join(Client.apiPath, "/lists/tasks/all"), {
      headers: { ...Client.headers },
    }).then(Client.checkStatus);

    let responseObject = await Client.parseJSON(response);
    if (callback) callback(responseObject);

    return responseObject;
  }

  static async getListsNames() {
    let response = await fetch(path.join(Client.apiPath, "/lists/all"), {
      headers: { ...Client.headers },
    }).then(Client.checkStatus);

    let responseObject = await Client.parseJSON(response);

    return responseObject.map((list: object, i: number) => ({
      label: list.title,
      value: i,
    }));
  }

  static async createList(title: string) {
    let response = await fetch(path.join(Client.apiPath, "/lists"), {
      method: "POST",
      body: JSON.stringify({ title }),
      headers: { "Content-Type": "application/json", ...Client.headers },
    }).then(Client.checkStatus);
  }

  static async registerUser(login: string, password: string) {
    await fetch(path.join(Client.apiPath, "/users"), {
      method: "POST",
      headers: { "Content-Type": "application/json", ...Client.headers },
      body: JSON.stringify({ login: login, password: password }),
    });
  }

  static async loginUser(login: string, password: string) {
    let { token } = await fetch(path.join(Client.apiPath, "/users/login"), {
      method: "POST",
      headers: { "Content-Type": "application/json", ...Client.headers },
      body: JSON.stringify({ login: login, password: password }),
    })
      .then(Client.checkStatus)
      .then(Client.parseJSON);
    Client.addToken(token);
  }

  static checkStatus(response: Response) {
    // if (response.status === 403) {
    //   document.location.href = "/login";
    // }
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
