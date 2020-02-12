import mongoose from "mongoose";
import CreateCustomSchema, { mongooseBase } from "../mongooseBase";
const Schema = mongoose.Schema;

export interface ITag extends mongooseBase {
  title: string;
}

let TagSchema = CreateCustomSchema({ title: String });
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
