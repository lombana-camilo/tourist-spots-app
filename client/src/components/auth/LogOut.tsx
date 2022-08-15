import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  useDeleteSessionMutation,
  useLazyGetCurrentUserQuery,
} from "../../store/api/authApiSlice";
import { useAppDispatch } from "../../store/hooks";
import { setSnackBar } from "../../store/notifications/notificationsSlice";

export const LogOut = () => {
  const navigate = useNavigate();
   const dispatch = useAppDispatch()
  const [ getCurrentUser ] = useLazyGetCurrentUserQuery();
  const [deleteSession] = useDeleteSessionMutation();
  const handleLogout = async () => {
      try {
        const deleted = await deleteSession().unwrap();
         // if(deleted.accessToken === null){
         // }
         navigate('/spots')
         getCurrentUser().unwrap()
      dispatch(
        setSnackBar({
          snackBarOpen: true,
          snackBarType: "success",
          snackBarMessage: "Successfully logged out!"
        })
      );
      } catch (e) {
        console.log(e) 
      }
  };
  return <Button color="warning" size="small" variant="outlined" onClick={handleLogout}>LogOut</Button>;
};
