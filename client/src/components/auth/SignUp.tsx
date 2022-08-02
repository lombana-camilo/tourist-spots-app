import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { object, string, TypeOf } from "zod";
import { useState } from "react";
import { useCreateUserMutation } from "../../store/api/authApiSlice";

export const SignUp = () => {
  //Zod schema
  const createUserSchema = object({
    password: string().min(7, "Password must be 7 chars minimum!"),
    passwordConfirmation: string(),
    username: string().min(1, "Username is required"),
    email: string({ required_error: "Email is required" }).email(
      "Enter a valid Email"
    ),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match!",
    path: ["passwordConfirmation"],
  });
  type CreateUserType = TypeOf<typeof createUserSchema>;

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateUserType>({ resolver: zodResolver(createUserSchema) });

   const [createUser] = useCreateUserMutation()
  const [createUserError, setCreateUserError] = useState("")
  const onSubmit = async (values: CreateUserType) => {
    try {
      await createUser(values).unwrap();
      // navigate("/login");
    } catch (e: any) {
         console.log(e)
      setCreateUserError(e.data);
    }
  };

  return (
    <div>
      <p>{createUserError}</p>
      <h1>SignUp</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="username">Username: </label>
          <input id="username" type="text" {...register("username")} />
          <p>{errors.username?.message}</p>
        </div>
        <div>
          <label htmlFor="username">Email: </label>
          <input id="email" type="email" {...register("email")} />
          <p>{errors.email?.message}</p>
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input id="password" type="password" {...register("password")} />
          <p>{errors.password?.message}</p>
        </div>
        <div>
          <label htmlFor="passwordConfirmation">Confirm Password: </label>
          <input id="passwordConfirmation" type="password" {...register("passwordConfirmation")} />
          <p>{errors.passwordConfirmation?.message}</p>
        </div>
               <button>Submit</button>
      </form>
    </div>
  );
};
