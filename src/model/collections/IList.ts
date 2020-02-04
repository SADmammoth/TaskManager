import { ITag } from "../entities/Tag";
import { IUser } from "../entities/User";
import mongooseBase from "../mongooseBase";

export default interface IList extends mongooseBase {
  title: string;
  tags: ITag["_id"];
  owner: IUser;
}
