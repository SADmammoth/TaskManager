import { Schema, Document } from "mongoose";
import SubscriptionController from "../controllers/SubscriptionController";
export default interface mongooseBase extends Document {
  _id: Schema.Types.ObjectId;
}
