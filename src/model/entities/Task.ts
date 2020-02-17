import mongoose from "mongoose";
import { TaskCard } from "../../view/generic/TaskListView";
import { ITag } from "./Tag";
import SubscriptionController from "../../controllers/SubscriptionController";
import CustomSchema from "../mongooseBase";

const Schema = mongoose.Schema;

export interface ITask extends ITag {
  content: string;
  assignedTo: Date;
  duration: Number;
}

let TaskSchema = new CustomSchema({
  title: String,
  content: String,
  assignedTo: Date,
  duration: Number
});

let Task = mongoose.model<ITask>("Task", TaskSchema);
export default Task;

// export default class Task {
//   private _name: string = "";
//   get name(): string {
//     return this._name;
//   }
//   private _content: string = "";
//   get content(): string {
//     return this._content;
//   }

//   constructor(name: string, content: string) {
//     this.edit(name, content);
//   }
//   edit(name: string, content: string): Boolean {
//     let flag = false;
//     if (name !== this.name) {
//       this._name = name;
//       flag = true;
//     }

//     if (content !== this.content) {
//       this._content = content;
//       flag = true;
//     }
//     return flag;
//   }
//   json() {
//     return `{"name": "${this.name}","content": "${this.content}"}`;
//   }

//   toString() {
//     return this.json();
//   }

//   object() {
//     return JSON.parse(this.json());
//   }
// }
