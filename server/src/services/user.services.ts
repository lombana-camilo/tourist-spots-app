import { omit } from "lodash";
import UserModel, { User } from "./../models/users.models";

export const createUser = async (
  createUserInput: Omit<User, "comparePassword">
) => {
  try {
    const newUser = await UserModel.create(createUserInput);
    return omit(newUser.toJSON(), "password");
  } catch (error) {
    throw new Error(error);
  }
};

export const validatePassword = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const user = await UserModel.findOne({ email });
  if (!user) {
    return false;
  }

  const isValid = await user.comparePassword(password);
  if (!isValid) {
    return false;
  }

   const omitPassword = omit(user.toJSON(), "password");
   return {...omitPassword,_id:user._id as string}
};
