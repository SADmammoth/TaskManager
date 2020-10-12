import mongoose, { Schema } from "mongoose";
import mongooseBase from "../mongooseBase";
import { ObjectId } from "mongodb";

export interface ITag extends mongooseBase {
  title: string;
  owner: ObjectId;
}

let TagSchema = new Schema({ title: String });
let Tag = mongoose.model<ITag>("Tag", TagSchema);

export default Tag;
