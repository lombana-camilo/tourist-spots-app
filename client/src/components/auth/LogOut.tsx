import {
  useDeleteSessionMutation,
  useGetCurrentUserQuery,
} from "../../store/api/authApiSlice";

export const LogOut = () => {
  const { refetch } = useGetCurrentUserQuery();
  const [deleteSession] = useDeleteSessionMutation();
  const logout = async () => {
    deleteSession().unwrap();
      refetch()
  };
  return <button onClick={logout}>LogOut</button>;
};
