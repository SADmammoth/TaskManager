import Task from '../model/entities/Task.ts';
import TaskList from '../model/collections/TaskList';

const tasks = new TaskList();

exports.create = function(req, res) {
    let task = new Task("Task1", "<ul><li>Subtask1</li><li>Subtask2</li><li>Subtask3</li></ul>");
    tasks.Add(task);
    res.send(tasks.toString());
};