import { AppBar, Button, Stack, Toolbar, Typography } from "@mui/material";
import { get } from "lodash";
import { useNavigate } from "react-router-dom";
import { useGetCurrentUserQuery } from "../../store/api/authApiSlice";
import { SignedInLinks } from "./SignedInLinks";
import { SignedOutLinks } from "./SignedOutLinks";

export const NavBar = () => {
  const { isLoading, isSuccess,error } = useGetCurrentUserQuery();
  const navigate = useNavigate();
   // if (error){
   //    console.log(get(error,'data'))
   // }
  return (
    <div>
      <AppBar  sx={{ background: "#323336" }}>
        <Toolbar>
          <Typography variant="h5" sx={{flexGrow:1}}>Tourist-Spots</Typography>
          <Stack direction="row" spacing={2}>
            <Button onClick={() => navigate("/spots")}>Spots</Button>
            {isLoading ? null : isSuccess ? (
              <SignedInLinks />
            ) : (
              <SignedOutLinks />
            )}
          </Stack>
        </Toolbar>
      </AppBar>
    </div>
  );
};
