import Task from "../model/entities/Task.ts";
import TaskList from "../model/collections/TaskList";
import taskList from "../model/instances.ts";

exports.create = function(req, res) {
  let task = new Task(
    req.body.title,
    "<ul><li>Subtask1</li><li>Subtask2</li><li>Subtask3</li></ul>"
  );
  taskList.addTask(task);
  res.json(JSON.stringify({ message: taskList.toString() }));
};

exports.getList = function(req, res) {
  if (req.params.taskListID === "0") {
    res.json(taskList.getJSONTasks());
  } else {
    res.status(404);
    res.send("List not found");
  }
};
