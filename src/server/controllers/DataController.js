import Folder from '../models/collections/Folder.ts';
import TaskList from '../models/collections/TaskList.ts';
import Task from '../models/entities/Task.ts';
import retrieveFields from '../helpers/retrieveFields';
import SubscriptionController from './SubscriptionController';
import isEmptyObject from '../../helpers/isEmptyObject';
import { StatusCodes } from 'http-status-codes';
import { filterEmpty } from '../helpers/filterEmpty';
import { addTaskToList } from '../helpers/addTaskToList';
import { mapListId } from '../helpers/mapListId';
import { mapTaskId } from '../helpers/mapTaskId';
import { getDocument } from '../helpers/getDocument';

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

    SubscriptionController.update(req, res);

    next(req, res, `List ${title} created`, StatusCodes.CREATED);
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
      res.code(StatusCodes.NOT_FOUND);
      res.send(`List id ${taskListId} not found`);
      return;
    }

    let result = await TaskList.updateOneById(list._id, {
      $push: { orders: body },
    });

    if (result.nModified > 0) {
      next(req, res, 'Order added to list by id ' + taskListId);
    } else {
      res.code(StatusCodes.BAD_REQUEST);
      res.send('Wrong body format');
    }
  },

  addTask: async function (req, res, next) {
    const {
      user: { _id: owner },
      params: { taskListId },
      body,
    } = req;

    Task.create(
      retrieveFields(body, ['title', 'content', 'assignedTo', 'duration'])
    ).then((task) => {
      addTaskToList(owner, taskListId, task).then((response) => {
        if (!response) {
          res.code(StatusCodes.NOT_FOUND);
          res.send(`List id ${taskListId} not found`);
          return;
        }

        if (response.nModified > 0) {
          next(req, res, `Task created`, StatusCodes.CREATED);
        } else {
          res.code(StatusCodes.BAD_REQUEST);
          res.send('Wrong body format');
        }
      });
    });
  },

  editTask: async function (req, res, next) {
    const {
      user: { _id: userId },
      params: { taskListId: taskListRequestId, taskId: taskRequestId },
      body,
    } = req;

    let root = await getRoot(userId);
    let listId = mapListId(root, taskListRequestId);

    if (!listId) {
      res.code(StatusCodes.NOT_FOUND);
      res.send(`List id ${taskListRequestId} not found`);
      return;
    }

    const list = await TaskList.findById(listId);
    const taskId = mapTaskId(list, taskRequestId);

    if (!taskId) {
      res.code(StatusCodes.NOT_FOUND);
      res.send(`Task id ${taskListRequestId} not found`);
      return;
    }

    let response = await Task.updateById(
      taskId,
      retrieveFields(body, ['title', 'content', 'assignedTo', 'duration'])
    );

    if (response.nModified > 0) {
      next(req, res, `Task by id ${taskRequestId} updated`);
    } else {
      res.send(StatusCodes.BAD_REQUEST);
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
      res.code(StatusCodes.NOT_FOUND);
      res.send(`List id ${taskListId} not found`);
      return;
    }

    const list = await TaskList.findById(listId);

    let tasks = await Promise.all(
      list.sort(parseInt(orderId)).map(async (taskId) => ({
        ...getDocument(await Task.findById(taskId)),
        listId,
      }))
    );
    tasks = filterEmpty(tasks);

    res.json({
      ...list,
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
      lists.map((list) =>
        list.sort(parseInt(orderId)).map(async (taskId) => ({
          ...getDocument(await Task.findById(taskId)),
          listId: list._id,
        }))
      )
    );

    res.json(tasks);
  },
};

export default DataController;
