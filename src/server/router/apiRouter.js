const express = require('express');
const DataController = require('../controllers/DataController');
const SubscriptionController = require('../controllers/SubscriptionController');
const deleteMethod = require('../helpers/methods/deleteMethod').deleteMethod;
const get = require('../helpers/methods/get').get;
const patch = require('../helpers/methods/patch').patch;
const post = require('../helpers/methods/post').post;
const put = require('../helpers/methods/put').put;

const router = express.Router();

post(router, '/lists', DataController.createList);
put(router, '/lists/:taskListId/orders', DataController.addListOrder);
post(router, '/lists/:taskListId', DataController.addTask);
get(router, '/lists/all', DataController.getAllLists);
get(router, '/lists/tasks/all', DataController.getAllTasks);
get(router, '/lists/:taskListId', DataController.getList);
get(router, '/subscribe', SubscriptionController.subscribe);
get(router, '/dataUpdated', SubscriptionController.update);
patch(router, '/lists/:taskListId/:taskId', DataController.editTask);
put(router, '/lists/:taskListId/:taskId', DataController.replaceTask);
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
deleteMethod(router, '/lists/:taskListId/:taskId', DataController.deleteTask);

module.exports = router;
