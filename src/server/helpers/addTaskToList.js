const TaskList = require('../models/collections/TaskList.js');
const getRoot = require('../controllers/DataController').getRoot;
const mapListId = require('./mapListId').mapListId;

module.exports = async function addTaskToList(owner, listRequestId, task) {
  const root = await getRoot(owner);
  const listId = mapListId(root, listRequestId);

  const list = await TaskList.findById(listId);

  if (!list) {
    return list;
  }

  list.addTask(task);

  return list;
};
