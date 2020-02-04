import express from "express";
import DataController from "../controllers/DataController";
import SubscriptionController from "../controllers/SubscriptionController";
import UserController from "../controllers/UserController";

var router = express.Router();

router.post("/lists/", DataController.createList);
router.post("/lists/:taskListID", DataController.addTask);
router.get("/lists/:taskListID", DataController.getList);
router.get("/subscribe", SubscriptionController.subscribe);
router.get("/dataUpdated", SubscriptionController.update);
router.post("/users", UserController.registerNew);
export default router;
