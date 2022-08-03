import { AppBar, Button, Stack, Toolbar, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetCurrentUserQuery } from "../../store/api/authApiSlice";
import { SignedInLinks } from "./SignedInLinks";
import { SignedOutLinks } from "./SignedOutLinks";

export const NavBar = () => {
  const { isLoading, isSuccess } = useGetCurrentUserQuery();
  const navigate = useNavigate();
  return (
    <div>
      <AppBar sx={{ background: "#0C2249" }}>
        <Toolbar>
          <Typography variant="h4" sx={{flexGrow:1}}>Tourist-Spots</Typography>
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
