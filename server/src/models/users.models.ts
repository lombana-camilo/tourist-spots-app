import {
  getModelForClass,
  modelOptions,
  pre,
  prop,
} from "@typegoose/typegoose";
import bcrypt from "bcrypt";
import config from "config";

@modelOptions({
  schemaOptions: {
    timestamps: true,
    versionKey: false,
  },
})
@pre<User>("save", async function () {
  const saltRounds = config.get<number>("saltFactor");
  const hash = await bcrypt.hash(this.password, saltRounds);
  this.password = hash;
})
export class User {
  @prop({ required: true })
  username: string;

  @prop({ required: true })
  password: string;

  @prop({ required: true, unique:true })
  email: string;

   //Return true/false
  async comparePassword(this: User, candidatePassword: string):Promise<boolean> {
    return await bcrypt.compare(candidatePassword, this.password);
  }
}

const UserModel = getModelForClass(User);
export default UserModel;
