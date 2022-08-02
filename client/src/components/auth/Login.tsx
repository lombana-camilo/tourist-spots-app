import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { object, string, TypeOf } from "zod";
import { useState } from "react";
import {
  useCreateSessionMutation,
  useGetCurrentUserQuery,
} from "../../store/api/authApiSlice";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";

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
          <TextField
            label="email"
            fullWidth
            required
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            label="password"
            fullWidth
            required
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
        <Button variant="contained" type="submit" fullWidth>
          Submit
        </Button>
      </form>
    </div>
  );
};
