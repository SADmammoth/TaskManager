const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

let FolderSchema = new Schema({
  title: String,
  tags: [Schema.Types.ObjectId],
  owner: [Schema.Types.ObjectId],
  children: [Schema.Types.ObjectId],
});

FolderSchema.methods.addChildren = async function (...children) {
  await this.model('Folder').updateOne(
    { _id: this._id },
    { children: [...this.children, ...children] }
  );
};

let Folder = mongoose.model('Folder', FolderSchema, 'lists');

module.exports = Folder;
