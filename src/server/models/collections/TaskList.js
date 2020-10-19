const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

let TaskListSchema = new Schema({
  title: String,
  tags: [Schema.Types.ObjectId],
  owner: [Schema.Types.ObjectId],
  tasks: [Schema.Types.ObjectId],
  orders: [[Number]],
  currentOrder: Number,
});

TaskListSchema.methods.addTask = async function (...tasks) {
  let orders = [];
  if (!this.orders.length) {
    orders[0] = [...new Array(tasks.length).fill(0).map((el, i) => i)];
  } else {
    orders = this.orders.map((order, i) => {
      return [
        ...order,
        ...new Array(tasks.length).fill(0).map((el, i) => i + order.length),
      ];
    });
  }
  await this.model('TaskList').findByIdAndUpdate(this._id, {
    tasks: [...this.tasks, ...tasks],
    orders,
  });
};

TaskListSchema.methods.removeTask = async function (taskIndex) {
  await this.model('TaskList').findByIdAndUpdate(this._id, {
    tasks: this.tasks.filter((task, index) => index != taskIndex),
    orders: this.orders.map((order, i) => {
      return order.filter((taskOrderIndex) => taskOrderIndex !== taskIndex);
    }),
  });
};

TaskListSchema.methods.sort = function (orderNumber) {
  if (!orderNumber || (orderNumber < 0 && orderNumber >= this.orders.length)) {
    orderNumber = this.currentOrder;
  }
  const order = this.orders[orderNumber];
  const tasks = this.tasks;

  if (!order) {
    return tasks;
  }
  return order.map((index) => tasks[index]);
};

TaskListSchema.methods.alterCurrentOrder = async function (newOrder) {
  return await this.model('TaskList').findByIdAndUpdate(this._id, {
    orders: this.orders.map((order, index) =>
      index === this.currentOrder ? newOrder : order
    ),
  });
};

let TaskList = mongoose.model('TaskList', TaskListSchema, 'lists');

module.exports = TaskList;
