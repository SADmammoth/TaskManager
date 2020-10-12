import mongoose, { Schema } from "mongoose";

import { ITask } from "../entities/Task";
import IList from "./IList";

export interface ITaskList extends IList {
  tasks: ITask["_id"];
  order: [[number]];
  currentOrder: number;
}

let TaskListSchema = new Schema({
  title: String,
  tags: [Schema.Types.ObjectId],
  owner: [Schema.Types.ObjectId],
  tasks: [Schema.Types.ObjectId],
  orders: [[Number]],
  currentOrder: Number,
});

TaskListSchema.methods.addTask = async function (...tasks: any[]) {
  await this.model("TaskList").findByIdAndUpdate(this._id, {
    tasks: [...this.tasks, ...tasks],
    orders: this.orders.map((order: [number], i: number) => {
      return [
        ...order,
        ...new Array(tasks.length).fill(0).map((el, i) => i + order.length),
      ];
    }),
  });
};

TaskListSchema.methods.removeTask = async function (taskIndex: number) {
  await this.model("TaskList").findByIdAndUpdate(this._id, {
    tasks: this.tasks.filter(
      (task: ITask, index: number) => index !== taskIndex
    ),
    orders: this.orders.map((order: [number], i: [number]) => {
      return order.filter((taskOrderIndex) => taskOrderIndex !== taskIndex);
    }),
  });
};

TaskListSchema.methods.sort = function (orderNumber: number) {
  if (!orderNumber || (orderNumber < 0 && orderNumber >= this.orders.length)) {
    orderNumber = this.currentOrder;
  }
  const order = this.orders[orderNumber];
  const tasks = this.tasks;

  if (!order) {
    return tasks;
  }
  return order.map((index: number) => tasks[index]);
};

TaskListSchema.methods.alterCurrentOrder = async function (newOrder: [number]) {
  return await this.model("TaskList").findByIdAndUpdate(this._id, {
    orders: this.orders.map((order: [number], index: number) =>
      index === this.currentOrder ? newOrder : order
    ),
  });
};

let TaskList = mongoose.model<ITaskList>("TaskList", TaskListSchema, "lists");

export default TaskList;
