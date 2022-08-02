import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { object, string, TypeOf } from "zod";
import { useState } from "react";
import {
  useCreateSessionMutation,
  useGetCurrentUserQuery,
} from "../../store/api/authApiSlice";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  //Zod schema
  const createSessionSchema = object({
    email: string({ required_error: "Email is required" }).email(
      "Enter a valid Email"
    ),
    password: string().min(7, "Password must be 7 chars minimum!"),
  });
  type CreateSessionType = TypeOf<typeof createSessionSchema>;

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateSessionType>({
    resolver: zodResolver(createSessionSchema),
  });

  const { refetch } = useGetCurrentUserQuery();
  const navigate = useNavigate();
  const [createSession] = useCreateSessionMutation();
  const [loginError, setLoginError] = useState("");
  const onSubmit = async (values: CreateSessionType) => {
    try {
      const session = await createSession(values).unwrap();
      console.log({ session });
      navigate("/spots");
      refetch();
    } catch (e: any) {
      setLoginError(e.data);
    }
  };

  return (
    <div>
      <p>{loginError}</p>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <button>Submit</button>
      </form>
    </div>
  );
};
