import { Alert, Snackbar} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setSnackBar } from "../../store/notifications/notificationsSlice";

export const SnackNotification = () => {
  const dispatch = useAppDispatch();
  const { snackBarOpen, snackBarType, snackBarMessage } = useAppSelector(
    (state) => state.notification
  );

  const handleClose = () => {
    dispatch(
      setSnackBar({
        snackBarOpen: false,
        snackBarType,
        snackBarMessage,
      })
    );
  };
  return (
    <Snackbar
      open={snackBarOpen}
         onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      autoHideDuration={6000}
    >
      <Alert onClose={handleClose} severity={snackBarType} variant="filled">
        {snackBarMessage}
      </Alert>
    </Snackbar>
  );
};
