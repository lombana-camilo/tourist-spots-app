import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  useDeleteSessionMutation,
  useGetCurrentUserQuery,
} from "../../store/api/authApiSlice";

export const LogOut = () => {
  const navigate = useNavigate();
  const { refetch } = useGetCurrentUserQuery();
  const [deleteSession] = useDeleteSessionMutation();
  const logout = async () => {
    await deleteSession().unwrap();
      navigate('/spots')
      refetch()
  };
  return <Button color="warning" variant="outlined" onClick={logout}>LogOut</Button>;
};
