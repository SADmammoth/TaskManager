import mongoose, { Schema } from "mongoose";
import mongooseBase from "../mongooseBase";
import crypto, { BinaryLike } from "crypto";

export interface IUser extends mongooseBase {
  login: string;
  password: string;
}

let UserSchema = new Schema({
  login: {
    type: Schema.Types.String,
    required: "Provide login",
    unique: "Login is already exists",
  },
  passwordHash: Schema.Types.String,
  salt: Schema.Types.String,
});

UserSchema.virtual("password")
  .set(function (
    this: { salt?: BinaryLike; passwordHash?: String },
    password: string
  ) {
    if (password) {
      this.salt = crypto.randomBytes(128).toString("base64");
      this.passwordHash = crypto
        .pbkdf2Sync(password, this.salt, 1, 128, "sha1")
        .toString("hex");
    } else {
      this.salt = undefined;
      this.passwordHash = undefined;
    }
  })

  .get(function (this: { passwordHash?: String }) {
    return this.passwordHash;
  });

UserSchema.methods.checkPassword = function (password: string) {
  if (!password) return false;
  if (!this.passwordHash) return false;
  
  return (
    crypto.pbkdf2Sync(password, this.salt, 1, 128, "sha1").toString("hex") ===
    this.passwordHash
  );
};

let User = mongoose.model<IUser>("User", UserSchema);

export default User;
