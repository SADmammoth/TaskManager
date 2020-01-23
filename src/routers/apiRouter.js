import express from "express";
import AddTaskController from "../controllers/AddTaskController";
import DatabaseManager from "../controllers/DatabaseManager";

var router = express.Router();

router.get("/db/listdb", DatabaseManager.listdb);
router.put("/db/createlist", DatabaseManager.createList);
export default router;
