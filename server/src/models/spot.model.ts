import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";

@modelOptions({ schemaOptions: { timestamps: false, versionKey: false } })
export class Spot {
  @prop({required:true})
  title: string;

  @prop({required:true})
  description: string;

  @prop({required:true})
  location: string;
}

const SpotModel = getModelForClass(Spot)
export default SpotModel
