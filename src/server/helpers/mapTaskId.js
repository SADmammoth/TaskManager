module.exports = function mapTaskId(list, taskRequestId) {
  return list.tasks[parseInt(taskRequestId)];
};
