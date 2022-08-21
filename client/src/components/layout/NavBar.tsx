import {
  AppBar,
  Box,
  Button,
  Link,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
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
        <Toolbar sx={{ justifyContent: "space-around"}}>
          <Typography
            sx={{
              flexGrow: 1,
              typography: { md: "h3", sm: "h6" },
              display: { xs: "none", sm: "flex" },
            }}
          >
            <Link href="/" sx={{ textDecoration: "none", color: "inherit" }}>
              Tourist-Spots
            </Link>
          </Typography>
          <Stack direction="row" spacing={3} sx={{display:"flex", justifyContent:"space-around"}}>
            <Button color="info" variant="contained" size="small" onClick={() => navigate("/spots")}>
              AllSpots
            </Button>
            {results.isLoading ? null : results.isSuccess ? (
              <SignedInLinks username={results.data.username as string} />
            ) : (
              <SignedOutLinks />
            )}
          </Stack>
        </Toolbar>
      </AppBar>
    </div>
  );
};
