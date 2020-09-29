import mongoose from "mongoose";
import CustomSchema, { mongooseBase } from "../mongooseBase";

//TODO Change password to password hash
//TODO Use Password.js
export interface IUser extends mongooseBase {
  login: string;
  password: string;
}

let UserSchema = new CustomSchema({ login: String, password: String });

let User = mongoose.model<IUser>("User", UserSchema);

export default User;
