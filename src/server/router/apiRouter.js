import express from 'express';
import DataController from '../controllers/DataController';
import SubscriptionController from '../controllers/SubscriptionController';
import { delet } from '../helpers/methods/delete';
import { get } from '../helpers/methods/get';
import { post } from '../helpers/methods/post';
import { put } from '../helpers/methods/put';
import { patch } from '../helpers/methods/patch';

export var router = express.Router();

post(router, '/lists', DataController.createList);
put(router, '/lists/:taskListId/orders', DataController.addListOrder);
post(router, '/lists/:taskListId', DataController.addTask);
get(router, '/lists/all', DataController.getAllLists);
get(router, '/lists/tasks/all', DataController.getAllTasks);
get(router, '/lists/:taskListId', DataController.getList);
get(router, '/subscribe', SubscriptionController.subscribe);
get(router, '/dataUpdated', SubscriptionController.update);
put(router, '/lists/:taskListId/:taskId', DataController.editTask);
post(
  router,
  '/lists/:taskListId/orders/current',
  DataController.setCurrentOrder
);
put(
  router,
  '/lists/:taskListId/orders/current',
  DataController.updateCurrentOrder
);
delet(router, '/lists/:taskListId/:taskId', DataController.deleteTask);

export default router;
