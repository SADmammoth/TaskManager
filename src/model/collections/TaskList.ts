import Task from "../entities/Task";
import Tag from "../entities/Tag";

export default class TaskList {
  private tasks: Task[];

  private _name: string = "";
  get name(): string {
    return this._name;
  }

  private _dateCreated: number;
  get dateCreated(): number {
    return this._dateCreated;
  }

  private _tags: number[] = [];
  get tags(): number[] {
    return this._tags;
  }

  private newTasksCount: number = -1;

  constructor(name: string, tags?: number[], array?: Task[]) {
    this.tasks = [];
    this.edit(name, tags, array);
    this._dateCreated = Date.now();
  }

  edit(name?: string, tags?: number[], array?: Task[]) {
    if (name && name != "" && name != this._name) {
      this._name = name;
    }
    if (array) {
      this.tasks = array;
      this.newTasksCount += array.length;
    }
    if (tags && tags.length > 0) {
      this._tags != tags;
    }
    this.sendData();
  }

  getSortedTasks(predicate: (item1: Task, item2: Task) => number): Task[] {
    return this.tasks.sort(predicate).map(el => el.object());
  }

  getTasks(): Task[] {
    return this.tasks.map(el => el.object());
  }
  getJSONSortedTasks(predicate: (item1: Task, item2: Task) => number): string {
    return `{"tasks":[${this.tasks
      .sort(predicate)
      .map(el => el.json())
      .join(",")}]}`;
  }
  getJSONTasks() {
    return `{"tasks":[${this.tasks.map(el => el.json()).join(",")}]}`;
  }
  addTask(list: TaskList): void;
  addTask(array: Task[]): void;
  addTask(task: Task): void;

  addTask(parameter: TaskList | Task[] | Task): void {
    if (parameter instanceof TaskList) {
      this.tasks.push(...parameter.tasks);
      this.newTasksCount += parameter.tasks.length;
    } else if (parameter instanceof Array) {
      this.tasks.push(...parameter);
      this.newTasksCount += parameter.length;
    } else {
      this.tasks.push(parameter);
      this.newTasksCount += 1;
    }
    this.sendData();
  }

  removeTask(task: Task): Boolean;
  removeTask(
    predicate: (element: Task, index: number, array: Task[]) => Boolean
  ): Boolean;

  removeTask(
    parameter: Task | ((element: Task, index: number, array: Task[]) => Boolean)
  ): Boolean {
    let filtered;
    if (parameter instanceof Function) {
      filtered = this.tasks.filter(parameter);
    } else {
      filtered = this.tasks.filter(el => el === parameter);
    }
    if (this.tasks.length !== filtered.length) {
      this.tasks = filtered;
      return true;
    }

    return false;
  }

  toString() {
    return this.tasks.map(el => el.toString()).join("\n");
  }

  private async sendData() {
    // alert(0);
    // if (this.newTasksCount < 0) {
    //   await fetch("/api/db/createlist", {
    //     method: "PUT",
    //     body: `
    //     {
    //       name:${this.name},
    //       dateCreated:${this._dateCreated},
    //       tags:[${this.tags.join()}]
    //     }
    //     `
    //   });
    // }
    // this.newTasksCount = 0;
  }

  private async removeData(tasks: Task[]) {
    // await fetch("/api/db/removetasks", {
    //   method: "DELETE",
    //   body: `{tasks:[${tasks.map(tasks => tasks.json()).join(",")}]`
    // });
  }
}
