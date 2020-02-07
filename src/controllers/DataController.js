import mongoose from "mongoose";
import Folder from "../model/collections/Folder";
import TaskList from "../model/collections/TaskList";
import UserController from "./UserController";
import Task from "../model/entities/Task";

let root = null;
exports.userCheck = function() {
  // if (!UserController._isLoggedIn()) {
  //   throw Error("Not authorized user");
  // }
};
exports.init = async function(req, res) {
  UserController._register();
  root = await Folder.findOne({ title: "$root" }).exec();
  if (root === {}) {
    root = await Folder.create({ title: "$root" });
    root.addChildren(
      await TaskList.create({
        title: "Inbox",
        owner: UserController._getToken()
      })
    );
    if (res) {
      res.send();
    }
  }
};

exports.createList = async function(req, res) {
  let list = await TaskList.create({
    title: req.body.title,
    owner: UserController._getToken()
  });
  root.addChildren(list);
};

exports.addTask = async function(req, res) {
  try {
    let id = parseInt(req.params.taskListID);
    let task = await Task.create({
      title: req.body.title,
      content: req.body.content
    });

    (await TaskList.findOne({ _id: root.children[id] }).exec()).addTask(task); //TODO Refactor
    res.json(task);
  } catch (err) {
    res.status(404);
    res.send(err.message);
  }
};

exports.getList = async function(req, res) {
  try {
    let id = parseInt(req.params.taskListID);
    res.json({
      tasks: (
        await Promise.all(
          (
            await TaskList.findOne({ _id: root.children[id] }).exec()
          ).tasks.map(async el => Task.findOne({ _id: el }).exec())
        )
      ) //TODO Refactor
        .filter(el => !!el)
    });
  } catch (err) {
    res.status(404);
    res.send(err.message);
  }
};
