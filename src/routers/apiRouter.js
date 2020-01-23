import express from "express";
import TaskController from "../controllers/TaskController";
import DatabaseManager from "../controllers/DatabaseManager";

var router = express.Router();

router.get("/db/listdb", DatabaseManager.listdb);
router.put("/db/createlist", DatabaseManager.createList);
router.post("/tasks", TaskController.create);
router.get("/tasks/:taskListID", TaskController.getList);
export default router;
