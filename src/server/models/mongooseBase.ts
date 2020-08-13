import { Schema, Document, SchemaDefinition } from "mongoose";
import SubscriptionController from "../controllers/SubscriptionController";

export interface mongooseBase extends Document {}

interface CustomSchema extends Schema {}

const CustomSchema = (function (
  this: CustomSchema,
  object: SchemaDefinition
): Schema<any> {
  let schema = new Schema(object);
  // schema.pre("save", function () {
  //   SubscriptionController.update(this.toJSON().attrCache);
  // });
  // schema.pre("update", function () {
  //   SubscriptionController.update(this);
  // });
  // schema.pre("updateOne", function () {
  //   SubscriptionController.update(this);
  // });
  // schema.pre("updateMany", function () {
  //   SubscriptionController.update(this);
  // });
  // schema.statics.checkType = function (object: object) {
  //   console.log(this.model.base);
  // };
  return schema;
} as any) as { new (object: SchemaDefinition): CustomSchema };
export default CustomSchema;
