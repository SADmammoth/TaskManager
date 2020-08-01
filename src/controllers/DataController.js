import mongoose from 'mongoose';
import Folder from '../model/collections/Folder.ts';
import TaskList from '../model/collections/TaskList.ts';
import UserController from './UserController';
import Task, { ITask } from '../model/entities/Task.ts';

let root = null;
exports.userCheck = function () {
  // if (!UserController._isLoggedIn()) {
  //   throw Error("Not authorized user");
  // }
};
exports.init = async function (req, res) {
  if (!UserController._isLoggedIn()) {
    await UserController._register('root', 'user');
    console.log('User logged in');
  }
  root = await Folder.findOne({ title: '$root' });
  if (!root || Object.keys(root).length === 0) {
    root = await Folder.create({ title: '$root' });
    root.addChildren(
      await TaskList.create({
        title: 'Inbox',
        owner: UserController._getToken(),
      })
    );
    if (res) {
      res.send();
    }
  }
};

exports.createList = async function (req, res) {
  let list = await TaskList.create({
    title: req.body.title,
    owner: UserController._getToken(),
  });
  root.addChildren(list);
};

function retrieveFields(object, keys) {
  let result = {};
  keys.forEach((el) => (object[el] ? (result[el] = object[el]) : false));
  return result;
}

exports.addTask = async function (req, res) {
  try {
    let id = parseInt(req.params.taskListID);
    let task = await Task.create(
      retrieveFields(req.body, ['title', 'content', 'assignedTo', 'duration'])
    );

    (await TaskList.findOne({ _id: root.children[id] }).exec()).addTask(task); //TODO Refactor
    res.json(task);
  } catch (err) {
    res.status(404);
    res.send(err.message);
  }
};

exports.editTask = async function (req, res) {
  try {
    let listID = parseInt(req.params.taskListID);
    let taskID = parseInt(req.params.taskID);
    let list = await TaskList.findOne({ _id: root.children[listID] }).exec();
    console.log(
      retrieveFields(req.body, ['title', 'content', 'assignedTo', 'duration'])
    );
    let task = await Task.updateOne(
      { _id: list.tasks[taskID] },
      retrieveFields(req.body, ['title', 'content', 'assignedTo', 'duration'])
    ).exec();
    res.json(task);
  } catch (err) {
    res.status(404);
    res.send(err.message);
  }
};

exports.getList = async function (req, res) {
  try {
    let id = parseInt(req.params.taskListID);
    let list = await TaskList.findOne({ _id: root.children[id] });
    res.json({
      tasks: await Promise.all(
        list.tasks
          .map((el) => Task.findOne({ _id: el }).exec()) //TODO Refactor
          .filter((el) => !!el)
      ),
    });
  } catch (err) {
    res.status(404);
    res.send(err.message);
  }
};

exports.getAllTasks = async function (req, res) {
  res.json({
    tasks: (await Task.find({}).exec()).filter((el) => !!el),
  });
};
