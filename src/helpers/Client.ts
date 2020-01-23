import path from "path";

export default class Client {
  static userToken = 2233;
  static readonly apiPath = "./api/";
  static async addTask(
    task: { title: string },
    callback: (object: object) => any
  ) {
    let response = await fetch(path.join(this.apiPath, "/tasks"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(task)
    }).then(this.checkStatus);

    let responseObject = this.parseJSON(response);
    if (callback) callback(responseObject);

    return new Promise((resolve, reject) => {
      resolve(responseObject);
    });
  }

  static async getTasks(taskListID: number, callback: (object: object) => any) {
    let response = await fetch(
      path.join(this.apiPath, "/tasks/", taskListID.toString())
    ).then(this.checkStatus);

    let responseObject = this.parseJSON(response);
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
