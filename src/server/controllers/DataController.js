const Folder = require('../models/collections/Folder');
const TaskList = require('../models/collections/TaskList');
const Task = require('../models/entities/Task');
const retrieveFields = require('../helpers/retrieveFields');
const isEmptyObject = require('../../helpers/isEmptyObject');
const StatusCodes = require('http-status-codes').StatusCodes;
const filterEmpty = require('../helpers/filterEmpty');
const addTaskToList = require('../helpers/addTaskToList');
const mapListId = require('../helpers/mapListId');
const mapTaskId = require('../helpers/mapTaskId');
const getDocument = require('../helpers/getDocument');

function getRoot(ownerId) {
  return Folder.findOne({ title: '$root', owner: ownerId });
}

const DataController = {
  initUser: async function (userId) {
    let root = await getRoot(userId);

    if (isEmptyObject(root)) {
      root = await Folder.create({ title: '$root', owner: userId });
      root.addChildren(
        await TaskList.create({
          title: 'Inbox',
          owner: userId,
        })
      );
    }
  },

  createList: async function (req, res, next) {
    const {
      user: { _id: owner },
      body: { title },
    } = req;

    const list = await TaskList.create({
      title,
      owner,
      orders: [],
    });

    getRoot(owner).then((root) => root.addChildren(list));

    next();
  },

  addListOrder: async function (req, res, next) {
    const {
      user: { _id: owner },
      params: { taskListId },
      body,
    } = req;

    const list = await getRoot(owner).then((root) =>
      root.children.find((child, index) => index === parseInt(taskListId))
    );

    if (!list) {
      res.status(StatusCodes.NOT_FOUND);
      res.send(`List id ${taskListId} not found`);
      return;
    }

    let result = await TaskList.findByIdAndUpdate(list._id, {
      $push: { orders: body },
    });

    if (result.nModified > 0) {
      next();
      res.status(StatusCodes.BAD_REQUEST);
      res.send('Wrong body format');
    }
  },

  setCurrentOrder: async function (req, res, next) {
    const {
      user: { _id: owner },
      params: { taskListId },
      body: { orderId },
    } = req;

    const list = await getRoot(owner).then((root) =>
      root.children.find((child, index) => index === parseInt(taskListId))
    );

    if (!list) {
      res.status(StatusCodes.NOT_FOUND);
      res.send(`List id ${taskListId} not found`);
      return;
    }

    if (orderId < 0 && orderId >= list.orders.length) {
      res.status(StatusCodes.NOT_FOUND);
      res.send(`Order id ${taskListId} not found`);
      return;
    }

    let result = await TaskList.findByIdAndUpdate(list._id, {
      currentOrder: orderId,
    });
    if (result.nModified > 0) {
      next();
    } else {
      res.status(StatusCodes.BAD_REQUEST);
      res.send('Wrong body format');
    }
  },

  updateCurrentOrder: async function (req, res, next) {
    const {
      user: { _id: owner },
      params: { taskListId },
      body,
    } = req;

    const listId = await getRoot(owner).then((root) =>
      root.children.find((child, index) => index === parseInt(taskListId))
    );

    if (!listId) {
      res.status(StatusCodes.NOT_FOUND);
      res.send(`List id ${taskListId} not found`);
      return;
    }
    let list = await TaskList.findById(listId);
    let result = list.alterCurrentOrder(body);

    if (result.nModified > 0) {
      next();
    } else {
      res.status(StatusCodes.BAD_REQUEST);
      res.send('Wrong body format');
    }
  },

  addTask: async function (req, res, next) {
    const {
      user: { _id: owner },
      params: { taskListId },
      body,
    } = req;

    const task = await Task.create(
      retrieveFields(body, ['title', 'content', 'assignedTo', 'duration'])
    );
    const response = await addTaskToList(owner, taskListId, task);
    if (!response) {
      res.status(StatusCodes.NOT_FOUND);
      res.send(`List id ${taskListId} not found`);
      return;
    }

    next();
  },

  editTask: async function (req, res, next) {
    const {
      user: { _id: userId },
      params: { taskListId: taskListRequestId, taskId: taskRequestId },
      body,
    } = req;

    const root = await getRoot(userId);
    const listId = mapListId(root, taskListRequestId);

    if (!listId) {
      res.status(StatusCodes.NOT_FOUND);
      res.send(`List id ${taskListRequestId} not found`);
      return;
    }

    const list = await TaskList.findById(listId);
    const taskId = mapTaskId(list, taskRequestId);

    if (!taskId) {
      res.status(StatusCodes.NOT_FOUND);
      res.send(`Task id ${taskListRequestId} not found`);
      return;
    }

    let response = await Task.findByIdAndUpdate(
      taskId,
      retrieveFields(body, ['title', 'content', 'assignedTo', 'duration'])
    );
    if (response) {
      next();
    } else {
      res.status(StatusCodes.BAD_REQUEST);
      res.send(`Wrong body format`);
    }
  },

  replaceTask: async function (req, res, next) {
    const {
      user: { _id: userId },
      params: { taskListId: taskListRequestId, taskId: taskRequestId },
      body,
    } = req;

    const root = await getRoot(userId);
    const listId = mapListId(root, taskListRequestId);

    if (!listId) {
      res.status(StatusCodes.NOT_FOUND);
      res.send(`List id ${taskListRequestId} not found`);
      return;
    }

    const list = await TaskList.findById(listId);
    const taskId = mapTaskId(list, taskRequestId);

    if (!taskId) {
      res.status(StatusCodes.NOT_FOUND);
      res.send(`Task id ${taskListRequestId} not found`);
      return;
    }

    let response = await Task.findByIdAndUpdate(
      taskId,
      retrieveFields(body, ['title', 'content', 'assignedTo', 'duration'], true)
    );
    if (response) {
      next();
    } else {
      res.status(StatusCodes.BAD_REQUEST);
      res.send(`Wrong body format`);
    }
  },

  getList: async function (req, res) {
    const {
      user: { _id: owner },
      params: { taskListId },
      query: { orderId },
    } = req;

    const root = await getRoot(owner);
    const listId = mapListId(root, taskListId);

    if (!listId) {
      res.status(StatusCodes.NOT_FOUND);
      res.send(`List id ${taskListId} not found`);
      return;
    }

    const list = await TaskList.findById(listId);

    let tasks = await Promise.all(
      list.sort(parseInt(orderId)).map(async (taskId) => ({
        ...getDocument(await Task.findById(taskId)),
        listId: taskListId,
      }))
    );
    tasks = filterEmpty(tasks);

    res.json({
      ...getDocument(list),
      tasks,
    });
  },

  getAllLists: async function (req, res) {
    const {
      user: { _id: owner },
    } = req;

    const root = await getRoot(owner);
    const lists = await Promise.all(
      root.children.map(({ _id: listId }) => TaskList.findById(listId))
    );

    res.json(lists);
  },

  getAllTasks: async function (req, res) {
    const {
      user: { _id: owner },
      query: { orderId },
    } = req;

    const root = await getRoot(owner);

    const lists = await Promise.all(
      root.children.map(({ _id: listId }) => TaskList.findById(listId))
    );

    const tasks = await Promise.all(
      lists.map((list, index) =>
        list.sort(parseInt(orderId)).map(async (taskId) => ({
          ...getDocument(await Task.findById(taskId)),
          listId: index,
        }))
      )
    );

    res.json(tasks);
  },

  deleteTask: async function (req, res, next) {
    const {
      user: { _id: owner },
      params: { taskListId: taskListRequestId, taskId: taskRequestId },
    } = req;

    const root = await getRoot(owner);
    const listId = mapListId(root, taskListRequestId);
    if (!listId) {
      res.status(StatusCodes.NOT_FOUND);
      res.send(`List id ${taskListRequestId} not found`);
      return;
    }

    const list = await TaskList.findById(listId);
    const taskId = mapTaskId(list, taskRequestId);

    if (!taskId) {
      res.status(StatusCodes.NOT_FOUND);
      res.send(`Task id ${taskListRequestId} not found`);
      return;
    }

    await list.removeTask(taskRequestId);
    let response = await Task.findByIdAndDelete(taskId);

    if (response) {
      next();
    } else {
      res.status(StatusCodes.BAD_REQUEST);
      res.send(`Wrong body format`);
    }
  },
};

module.exports = DataController;
