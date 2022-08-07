import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { object, string, TypeOf } from "zod";
import { useState } from "react";
import {
  useCreateSessionMutation,
  useLazyGetCurrentUserQuery,
} from "../../store/api/authApiSlice";
import { useNavigate } from "react-router-dom";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useAppDispatch } from "../../store/hooks";
import { setSnackBar } from "../../store/notifications/notificationsSlice";

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

   const [getCurrentUser] = useLazyGetCurrentUserQuery()
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [createSession] = useCreateSessionMutation();

  const onSubmit = async (values: CreateSessionType) => {
    try {
      await createSession(values).unwrap();
      navigate("/spots");
        const userSession = await getCurrentUser().unwrap()
        dispatch(
          setSnackBar({
            snackBarOpen: true,
            snackBarType: "success",
            snackBarMessage: `Welcome ${userSession.username}`,
          })
        );
    } catch (e: any) {
      dispatch(
        setSnackBar({
          snackBarOpen: true,
          snackBarType: "warning",
          snackBarMessage: e.data || e.status,
        })
      );
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <TextField
            label="email"
            autoFocus
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
            type="password"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button variant="contained" type="submit" fullWidth>
            Submit
          </Button>
        </Box>
      </form>
    </Container>
  );
};
