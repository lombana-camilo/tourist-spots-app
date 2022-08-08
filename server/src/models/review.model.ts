import { getModelForClass, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { Spot } from "./spot.model";
import { User } from "./users.models";

@modelOptions({schemaOptions:{timestamps:false,versionKey:false}})
export class Review {
   @prop({required:true})
   comment:string

   @prop({required:true})
   rating:number

   @prop({ref:"Spot"})
   spotId:Ref<Spot>

   @prop({ref:"User"})
   user:Ref<User>

}

const ReviewModel = getModelForClass(Review)
export default ReviewModel
