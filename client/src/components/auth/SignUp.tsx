import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { object, string, TypeOf } from "zod";
import { useState } from "react";
import { useCreateUserMutation } from "../../store/api/authApiSlice";
import { Button, Container, TextField } from "@mui/material";

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

  const [createUser] = useCreateUserMutation();
  const [createUserError, setCreateUserError] = useState("");
  const onSubmit = async (values: CreateUserType) => {
    try {
      await createUser(values).unwrap();
      // navigate("/login");
    } catch (e: any) {
      console.log(e);
      setCreateUserError(e.data);
    }
  };

  return (
    <Container maxWidth="md">
      <p>{createUserError}</p>
      <h1>SignUp</h1>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Username"
            autoFocus
            fullWidth
            required
            {...register("username")}
            error={!!errors.username}
            helperText={errors.username?.message}
          />
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
          <TextField
            label="passwordConfirmation"
            fullWidth
            required
            {...register("passwordConfirmation")}
            error={!!errors.passwordConfirmation}
            helperText={errors.passwordConfirmation?.message}
          />
        <Button variant="contained" type="submit" fullWidth>
          Submit
        </Button>
      </form>
    </Container>
  );
};
