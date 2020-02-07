import { Schema, Document, SchemaDefinition } from "mongoose";
import SubscriptionController from "../controllers/SubscriptionController";
export interface mongooseBase extends Document {
  _id: Schema.Types.ObjectId;
}

export default function CreateCustomSchema(object: SchemaDefinition) {
  let schema = new Schema(object);
  schema.pre("save", () => SubscriptionController.update());
  return schema;
}
