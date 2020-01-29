import Task from "../model/entities/Task.ts";
import ModelManager from "../model/ModelManager.ts";
import SubscriptionController from "./SubscriptionController";

exports.updateData = function() {
  ModelManager.loadDataFromDB();
  console.log("Data loaded");
};

exports.create = function(req, res) {
  let task = new Task(
    req.body.title,
    "<ul><li>Subtask1</li><li>Subtask2</li><li>Subtask3</li></ul>"
  );
  ModelManager.addToList(0, task);
  SubscriptionController.update();
  res.json(ModelManager.getListJSON(0));
};

exports.getList = function(req, res) {
  if (req.params.taskListID === "0") {
    res.json(ModelManager.getListJSON(0));
  } else {
    res.status(404);
    res.send("List not found");
  }
};

//TODO Notifications to models
/*  
  Move notification responsibility to each model:
    Add list of actions on update
    OR
    Simply function call
*/
