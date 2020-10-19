const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

let TaskSchema = new Schema({
  title: String,
  content: String,
  assignedTo: Date,
  duration: Number,
  owner: Schema.Types.ObjectId,
});

let Task = mongoose.model('Task', TaskSchema);

module.exports = Task;
