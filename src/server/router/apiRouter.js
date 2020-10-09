import express from 'express';
import DataController from '../controllers/DataController';
import SubscriptionController from '../controllers/SubscriptionController';

var router = express.Router();

router.post('/lists', DataController.createList);
router.put('/lists/:taskListId/orders', DataController.addListOrder);
router.post('/lists/:taskListId', DataController.addTask);
router.get('/lists/all', DataController.getAllLists);
router.get('/lists/tasks/all', DataController.getAllTasks);
router.get('/lists/:taskListId', DataController.getList);
router.get('/subscribe', SubscriptionController.subscribe);
router.get('/dataUpdated', SubscriptionController.update);
router.put('/lists/:taskListId/:taskId', DataController.editTask);
export default router;
