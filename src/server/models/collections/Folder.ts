import mongoose, { Schema } from "mongoose";

import { ITaskList } from "./TaskList";
import IList from "./IList";

export interface IFolder extends IList {
  children: [ITaskList["_id"]];
}

let FolderSchema = new Schema({
  title: String,
  tags: [Schema.Types.ObjectId],
  owner: [Schema.Types.ObjectId],
  children: [Schema.Types.ObjectId],
});

FolderSchema.methods.addChildren = async function (...children: any[]) {
  await this.model("Folder").updateOne(
    { _id: this._id },
    { children: [...this.children, ...children] }
  );
};

let Folder = mongoose.model<IFolder>("Folder", FolderSchema, "lists");

export default Folder;
