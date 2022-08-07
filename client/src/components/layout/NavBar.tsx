import { AppBar, Button, Stack, Toolbar, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLazyGetCurrentUserQuery } from "../../store/api/authApiSlice";
import { SignedInLinks } from "./SignedInLinks";
import { SignedOutLinks } from "./SignedOutLinks";

export const NavBar = () => {
  const [getCurrentUser, results] = useLazyGetCurrentUserQuery();
  const navigate = useNavigate();

  useEffect(() => {
    getCurrentUser()
      .unwrap()
      .then()
      .catch((e) => console.log(e));
  }, []);
  return (
    <div>
      <AppBar sx={{ background: "#323336" }}>
        <Toolbar>
          <Typography variant="h5" sx={{ flexGrow: 1 }}>
            Tourist-Spots
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button onClick={() => navigate("/spots")}>Spots</Button>
            {results.isLoading ? null : results.isSuccess ? (
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
