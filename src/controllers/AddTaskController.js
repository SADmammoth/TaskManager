const Task = require('../model/entities/Task.ts');

exports.create = function(req, res) {
    let task = new Task("Task1", "<ul><li>Subtask1</li><li>Subtask2</li><li>Subtask3</li></ul>");
    res.send(task.toString());
};