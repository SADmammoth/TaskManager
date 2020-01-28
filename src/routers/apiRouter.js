import express from "express";
import DataController from "../controllers/DataController";
import SubscriptionController from "../controllers/SubscriptionController";

var router = express.Router();

router.post("/tasks", DataController.create);
router.get("/tasks/:taskListID", DataController.getList);
router.get("/subscribe", SubscriptionController.subscribe);
router.get("/dataUpdated", SubscriptionController.update);
export default router;
