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
  return Folder.findOne({ title: '$root', owner: ownerId });
}

exports.createList = async function (req, res) {
  let {
    user: { _id: userId },
    body: { title },
  } = req;

  let list = await TaskList.create({
    title,
    owner: userId,
    orders: [],
  });
  getRoot(userId).then((root) => root.addChildren(list));

  SubscriptionController.update(req, res);

  res.send(`List ${title} created`);
};

exports.addListOrder = async function (req, res) {
  const {
    user: { _id: userId },
  } = req;

  const { taskListID } = req.params;
  const list = await getRoot(userId).then((root) =>
    root.children.find((child, index) => index == taskListID)
  );

  if (!list) {
    res.code(400);
    res.send('Wrong list id');
    return;
  }

  let result = await TaskList.updateOne(
    {
      _id: list._id,
    },
    { $push: { orders: req.body } }
  );

  if (result.nModified > 0) {
    res.send('Order added to list by id ' + taskListID);
  } else {
    res.code(400);
    res.send('Wrong body format');
  }
};

exports.addTask = async function (req, res) {
  let {
    user: { _id: userId },
  } = req;

  // try {
  let id = parseInt(req.params.taskListID);
  let root = await getRoot(userId);
  Task.create(
    retrieveFields(req.body, ['title', 'content', 'assignedTo', 'duration'])
  ).then((task) => {
    TaskList.findOne({ _id: root.children[id] }).then((list) =>
      list.addTask(task)
    );

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
    query: { orderId },
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
        list
          .sort(parseInt(orderId))
          .map(async (el) => ({
            ...JSON.parse(JSON.stringify(await Task.findOne({ _id: el }))),
            listId: id,
          }))
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
    query: { orderId },
  } = req;

  let lists = await Promise.all(
    (await getRoot(userId)).children.map(({ _id }) => TaskList.findById(_id))
  );

  let tasksList = await Promise.all(
    lists.map(
      async (list) =>
        await Promise.all(
          list.sort(parseInt(orderId)).map(async (_id) => {
            console.log(await Task.findById(_id));
            return {
              ...(await Task.findById(_id))._doc,
              listId: list._id,
            };
          })
        )
    )
  );
  console.log(tasksList);
  res.json(tasksList);
};
