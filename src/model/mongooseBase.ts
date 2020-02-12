import { Schema, Document, SchemaDefinition } from "mongoose";
import SubscriptionController from "../controllers/SubscriptionController";

export interface mongooseBase extends Document {}

interface CustomSchema extends Schema {}

const CustomSchema = (function(
  this: CustomSchema,
  object: SchemaDefinition
): Schema<any> {
  let schema = new Schema(object);
  schema.pre("save", () => SubscriptionController.update());
  schema.pre("update", () => SubscriptionController.update());
  schema.pre("updateOne", () => SubscriptionController.update());
  schema.pre("updateMany", () => SubscriptionController.update());
  //schema.statics.checkType = function(object: object) {
  //   console.log(this.model.base);
  // };
  return schema;
} as any) as { new (object: SchemaDefinition): CustomSchema };
export default CustomSchema;
