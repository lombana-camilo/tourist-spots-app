import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { object, string, TypeOf } from "zod";
import {
  useCreateUserMutation,
  useLazyGetCurrentUserQuery,
} from "../../store/api/authApiSlice";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { setSnackBar } from "../../store/notifications/notificationsSlice";

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

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [createUser] = useCreateUserMutation();
  const [getCurrentUser] = useLazyGetCurrentUserQuery();

  const onSubmit = async (values: CreateUserType) => {
    try {
      await createUser(values).unwrap();
      navigate("/spots");
      await getCurrentUser().unwrap();
      dispatch(
        setSnackBar({
          snackBarOpen: true,
          snackBarType: "success",
          snackBarMessage: `User created successfully!`,
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
    <Container maxWidth="md" sx={{ paddingTop: "5rem" }}>
      <Paper elevation={10} sx={{ padding: "1.5rem", textAlign: "center" }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          SignUp
        </Typography>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
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
              type="password"
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <TextField
              label="passwordConfirmation"
              type="password"
              fullWidth
              required
              {...register("passwordConfirmation")}
              error={!!errors.passwordConfirmation}
              helperText={errors.passwordConfirmation?.message}
            />
            <Button variant="contained" type="submit" fullWidth>
              Submit
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};
