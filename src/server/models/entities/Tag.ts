import mongoose from "mongoose";
import CustomSchema, { mongooseBase } from "../mongooseBase";
import { ObjectId } from "mongodb";
const Schema = mongoose.Schema;

export interface ITag extends mongooseBase {
  title: string;
  owner: ObjectId;
}

let TagSchema = new CustomSchema({ title: String });
let Tag = mongoose.model<ITag>("Tag", TagSchema);

export default Tag;
// export default class Tag {
//   readonly id: number;
//   readonly name: string = "";

//   constructor(id: number, name: string) {
//     this.id = id;
//     if (name != "" && name != this.name) {
//       this.name = name;
//     }
//   }
// }