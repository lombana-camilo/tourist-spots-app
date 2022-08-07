import { useDispatch } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useGetCurrentUserQuery } from "../store/api/authApiSlice";
import { setSnackBar } from "../store/notifications/notificationsSlice";

export const RequireAuth = () => {
  const { isLoading, isSuccess } = useGetCurrentUserQuery();
  const location = useLocation();
  const dispatch = useDispatch();

  if (!isSuccess) {
    dispatch(
      setSnackBar({
        snackBarOpen: true,
        snackBarType: "warning",
        snackBarMessage: "Unauthorized!, please log in",
      })
    );
  }

  return isLoading ? (
    <p>Loading...</p>
  ) : isSuccess ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
