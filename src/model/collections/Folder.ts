import mongoose from "mongoose";
const Schema = mongoose.Schema;

import Task, { ITask } from "../entities/Task";
import Tag, { ITag } from "../entities/Tag";
import TaskList, { ITaskList } from "./TaskList";
import IList from "./IList";

// import DatabaseManager from "../../helpers/DatabaseManager";
import SubscriptionController from "../../controllers/SubscriptionController";

export interface IFolder extends IList {
  children: [ITaskList["_id"]];
}

let FolderSchema = new Schema({
  title: String,
  tags: [Schema.Types.ObjectId],
  owner: [Schema.Types.ObjectId],
  children: [Schema.Types.ObjectId]
});

FolderSchema.methods.addChildren = async function(...children: any[]) {
  await this.model("Folder").updateOne(
    { _id: this._id },
    { children: [...this.children, ...children] }
  );
};

let Folder = mongoose.model<IFolder>("Folder", FolderSchema, "lists");

export default Folder;

// export default class TaskList {
//   private tasks: Task[];
//   private static listIds: number = 0;
//   private listId: number;

//   private _name: string = "";
//   get name(): string {
//     return this._name;
//   }

//   private _dateCreated: number;
//   get dateCreated(): number {
//     return this._dateCreated;
//   }

//   private _tags: number[] = [];
//   get tags(): number[] {
//     return this._tags;
//   }

//   private newTasksCount: number = -1;

//   constructor(name: string, tags?: number[], array?: Task[], sendToDB = true) {
//     this.tasks = [];
//     this.listId = TaskList.listIds++;
//     this.edit(name, tags, array, sendToDB);
//     this._dateCreated = Date.now();
//   }

//   edit(name?: string, tags?: number[], array?: Task[], sendToDB = true) {
//     if (name && name != "" && name != this._name) {
//       this._name = name;
//     }
//     if (tags && tags.length > 0) {
//       this._tags != tags;
//     }
//     if (sendToDB) this.sendData();
//     if (array) {
//       this.tasks = array;
//       this.newTasksCount += array.length;
//       if (sendToDB) this.sendData();
//     }
//   }

//   getSortedTasks(predicate: (item1: Task, item2: Task) => number): Task[] {
//     return this.tasks.sort(predicate).map(el => el.object());
//   }

//   getTasks(): Task[] {
//     return this.tasks.map(el => el.object());
//   }
//   getJSONSortedTasks(predicate: (item1: Task, item2: Task) => number): string {
//     return `{"tasks":[${this.tasks
//       .sort(predicate)
//       .map(el => el.json())
//       .join(",")}]}`;
//   }
//   getJSONTasks() {
//     return `{"tasks":[${this.tasks.map(el => el.json()).join(",")}]}`;
//   }
//   addTask(list: TaskList): void;
//   addTask(array: Task[]): void;
//   addTask(task: Task): void;

//   addTask(parameter: TaskList | Task[] | Task): void {
//     if (parameter instanceof TaskList) {
//       this.tasks.push(...parameter.tasks);
//       this.newTasksCount += parameter.tasks.length;
//     } else if (parameter instanceof Array) {
//       this.tasks.push(...parameter);
//       this.newTasksCount += parameter.length;
//     } else {
//       this.tasks.push(parameter);
//       this.newTasksCount += 1;
//     }
//     this.sendData();
//   }

//   removeTask(task: Task): Boolean;
//   removeTask(
//     predicate: (element: Task, index: number, array: Task[]) => Boolean
//   ): Boolean;

//   removeTask(
//     parameter: Task | ((element: Task, index: number, array: Task[]) => Boolean)
//   ): Boolean {
//     let filtered;
//     if (parameter instanceof Function) {
//       filtered = this.tasks.filter(parameter);
//     } else {
//       filtered = this.tasks.filter(el => el === parameter);
//     }
//     if (this.tasks.length !== filtered.length) {
//       this.tasks = filtered;
//       return true;
//     }

//     return false;
//   }

//   toString() {
//     return this.tasks.map(el => el.toString()).join("\n");
//   }

//   private async CreateData() {
//     DatabaseManager.addList(
//       this.listId,
//       this.name,
//       this.tags,
//       this.dateCreated
//     );
//   }
//   private async sendData() {
//     if (this.newTasksCount < 0) {
//       this.CreateData();
//       this.newTasksCount = 0;
//       return;
//     }
//     let task;
//     for (let i = 0; i < this.newTasksCount; i++) {
//       console.log("task");
//       task = this.tasks[this.tasks.length - i - 1];
//       DatabaseManager.addTask(task.name, task.content, this.listId);
//     }
//     this.newTasksCount = 0;
//     SubscriptionController.update();
//   }

//   private async removeData(tasks: Task[]) {
//     SubscriptionController.update();
//     // await fetch("/api/db/removetasks", {
//     //   method: "DELETE",
//     //   body: `{tasks:[${tasks.map(tasks => tasks.json()).join(",")}]`
//     // });
//   }
// }
