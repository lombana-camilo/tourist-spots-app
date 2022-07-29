import { object, string, TypeOf } from "zod";

export const createUserSchema = object({
  body: object({
    username: string({ required_error: "Username is required" }),
    email: string({ required_error: "Email is required" }).email(
      "Not a valid Email"
    ),
    password: string({ required_error: "Password is required" }).min(
      5,
      "Must contain 5 chars minimum"
    ),
    passwordConfirmation: string({
      required_error: "Password confirmation is required",
    }).min(5, "Must contain 5 chars minimum"),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match!",
    path: ["passwordConfirmation"],
  }),
});

export type CreateUserSchemaType = TypeOf<typeof createUserSchema>;
