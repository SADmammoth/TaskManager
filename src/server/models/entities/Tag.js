const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

let TagSchema = new Schema({ title: String });
let Tag = mongoose.model('Tag', TagSchema);

module.exports = Tag;
