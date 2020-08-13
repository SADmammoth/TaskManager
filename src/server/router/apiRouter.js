import express from 'express';
import DataController from '../controllers/DataController';
import SubscriptionController from '../controllers/SubscriptionController';

var router = express.Router();

router.post('/lists/', DataController.createList);
router.post('/lists/:taskListID', DataController.addTask);
router.get('/lists/all', DataController.getAllTasks);
router.get('/lists/:taskListID', DataController.getList);
router.get('/subscribe', SubscriptionController.subscribe);
router.get('/dataUpdated', SubscriptionController.update);
router.put('/lists/:taskListID/:taskID', DataController.editTask);
export default router;
