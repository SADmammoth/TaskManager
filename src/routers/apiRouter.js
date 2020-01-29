import express from "express";
import DataController from "../controllers/DataController";
import SubscriptionController from "../controllers/SubscriptionController";
import UserController from "../controllers/UserController";

var router = express.Router();

router.post("/tasks", DataController.create);
router.get("/tasks/:taskListID", DataController.getList);
router.get("/subscribe", SubscriptionController.subscribe);
router.get("/dataUpdated", SubscriptionController.update);
router.get("/register", UserController.registerNew);
export default router;
