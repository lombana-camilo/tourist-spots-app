import { useDeleteSessionMutation } from "../../store/api/authApiSlice";

export const LogOut = () => {
  const [deleteSession] = useDeleteSessionMutation();
  const logout = async () => {
    deleteSession().unwrap();
  };
  return <button onClick={logout}>LogOut</button>;
};
