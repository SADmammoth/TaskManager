import mongoose, { Schema } from "mongoose";
import { ITag } from "./Tag";
import { ObjectId } from "mongodb";

export interface ITask extends ITag {
  content: string;
  assignedTo: Date;
  duration: Number;
}

let TaskSchema = new Schema({
  title: String,
  content: String,
  assignedTo: Date,
  duration: Number,
  owner: ObjectId,
});

let Task = mongoose.model<ITask>("Task", TaskSchema);

export default Task;
