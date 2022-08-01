import { getModelForClass, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { User } from "./users.models";

@modelOptions({
  schemaOptions: {
    timestamps: true,
    versionKey: false,
  },
})
export class Session {
  @prop({ref:()=>User})
  user: Ref<User>

  @prop({ default: true })
  valid: boolean;

   // Stores the browser data when the user log in
  @prop()
  userAgent: string;
}

const SessionModel = getModelForClass(Session);
export default SessionModel;
