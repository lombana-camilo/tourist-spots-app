import { getModelForClass, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { Spot } from "./spot.model";

@modelOptions({schemaOptions:{timestamps:false,versionKey:false}})
export class Review {
   @prop({required:true})
   comment:string

   @prop({required:true})
   rating:number

}

const ReviewModel = getModelForClass(Review)
export default ReviewModel
