import mongoose from "mongoose";
import mongooseBase from "../mongooseBase";

const Schema = mongoose.Schema;

//TODO Change password to password hash
//TODO Use Password.js
export interface IUser extends mongooseBase {
  login: string;
  password: string;
}

let UserSchema = new Schema({ login: String, password: String });

let User = mongoose.model<IUser>("User", UserSchema);

export default User;
