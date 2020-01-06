var express = require('express');
var router = express.Router();

var AddTaskController = require('../controllers/AddTaskController.js');

router.get('/tasks/create', AddTaskController.create);

module.exports = router;