import {
  getModelForClass,
  modelOptions,
  prop,
  Ref,
  Severity,
} from "@typegoose/typegoose";
import { Review } from "./review.model";
import { User } from "./users.models";

interface ImagesDocument {
   url:string
   filename:string
}

interface Geometry{
   type:"Point",
   coordinates:number[]
}

@modelOptions({ schemaOptions: { timestamps: false, versionKey: false },options:{allowMixed:Severity.ALLOW} })
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
  geometry: Geometry;

  @prop({ required: true })
  images: ImagesDocument[];

  @prop({ ref: () => Review })
  reviews: Ref<Review>[];
}

const SpotModel = getModelForClass(Spot);
export default SpotModel;
