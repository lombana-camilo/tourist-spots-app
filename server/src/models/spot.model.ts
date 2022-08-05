import {
  getModelForClass,
  modelOptions,
  prop,
  Ref,
} from "@typegoose/typegoose";
import { Review } from "./review.model";
import { User } from "./users.models";

@modelOptions({ schemaOptions: { timestamps: false, versionKey: false } })
export class Spot {
  @prop({ ref: () => User })
  user: Ref<User>;

  @prop({ required: true })
  title: string;

  @prop({ required: true })
  description: string;

  @prop({ required: true })
  location: string;

  @prop({ required: true })
  image: string;

  @prop({ ref: () => Review })
  reviews: Ref<Review>[];
}

const SpotModel = getModelForClass(Spot);
export default SpotModel;
