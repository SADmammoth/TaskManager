var express = require("express");
var router = express.Router();

var AddTaskController = require("../controllers/AddTaskController.js");
var DatabaseManager = require("../controllers/DatabaseManager.js");

router.get("/db/listdb", DatabaseManager.listdb);
router.put("/db/createlist", DatabaseManager.createList);
module.exports = router;
