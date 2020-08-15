import mongoose from 'mongoose';
import Folder from '../models/collections/Folder.ts';
import TaskList from '../models/collections/TaskList.ts';
import UserController from './UserController';
import Task, { ITask } from '../models/entities/Task.ts';
import retrieveFields from '../../helpers/retrieveFields';
import SubscriptionController from './SubscriptionController';

exports.userCheck = function () {
  // if (!UserController._isLoggedIn()) {
  //   throw Error("Not authorized user");
  // }
};

exports._init = async function (userId) {
  let root = await Folder.findOne({ title: '$root', owner: userId });
  if (!root || Object.keys(root).length === 0) {
    root = await Folder.create({ title: '$root', owner: userId });
    root.addChildren(
      await TaskList.create({
        title: 'Inbox',
        owner: userId,
      })
    );
  }
};

function getRoot(ownerId) {
  console.log(ownerId);
  return Folder.findOne({ title: '$root', owner: ownerId });
}

exports.createList = async function (req, res) {
  let {
    user: { _id: userId },
  } = req;

  let list = await TaskList.create({
    title: req.body.title,
    owner: userId,
  });
  getRoot(userId).then((root) => root.addChildren(list));

  SubscriptionController.update(req, res);
};

exports.addTask = async function (req, res) {
  let {
    user: { _id: userId },
  } = req;

  // try {
  let id = parseInt(req.params.taskListID);
  console.log(req.user);
  let root = await getRoot(userId);
  Task.create(
    retrieveFields(req.body, ['title', 'content', 'assignedTo', 'duration'])
  ).then((task) => {
    TaskList.findOne({ _id: root.children[id] }).then((list) =>
      list.addTask(task)
    );
    console.log(21);
    SubscriptionController.update(userId);

    res.json(task);
  });
  // } catch (err) {
  //   res.status(404);
  //   res.send(err.message);
  // }
};

exports.editTask = async function (req, res) {
  let {
    user: { _id: userId },
  } = req;

  try {
    let root = await getRoot(userId);
    let listID = parseInt(req.params.taskListID);
    let taskID = parseInt(req.params.taskID);
    let list = await TaskList.findOne({
      _id: root.children[listID],
      owner: userId,
    });

    let task = await Task.updateOne(
      { _id: list.tasks[taskID] },
      retrieveFields(req.body, ['title', 'content', 'assignedTo', 'duration'])
    );
    SubscriptionController.update(req, res);
    res.json(task);
  } catch (err) {
    res.status(404);
    res.send(err.message);
  }
};

exports.getList = async function (req, res) {
  let {
    user: { _id: userId },
  } = req;

  try {
    let root = await getRoot(userId);
    let id = parseInt(req.params.taskListID);
    let list = await TaskList.findOne({
      _id: root.children[id],
      owner: userId,
    });
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

exports.getAllLists = async function (req, res) {
  let {
    user: { _id: userId },
  } = req;
  let lists = [
    ...(await Promise.all(
      (await getRoot(userId)).children.map(({ _id }) =>
        TaskList.findOne({ _id })
      )
    )),
  ];

  res.json(lists);
};

exports.getAllTasks = async function (req, res) {
  let {
    user: { _id: userId },
  } = req;

  let lists = [
    ...(await Promise.all(
      (await getRoot(userId)).children.map(({ _id }) =>
        TaskList.findOne({ _id })
      )
    )),
  ];

  let tasksList = await Promise.all(
    lists.map(({ tasks }) => tasks.map(async (_id) => await Task.findById(_id)))
  );

  res.json(tasksList);
};
