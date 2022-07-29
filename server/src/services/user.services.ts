import { omit } from "lodash"
import UserModel, { User } from "./../models/users.models"

export const createUser = async(createUserInput:Omit<User,"comparePassword">)=>{
   try {
      const newUser = await UserModel.create(createUserInput)
      return omit(newUser.toJSON(),"password")
      
   } catch (error) {
     throw new Error(error) 
   }
}
