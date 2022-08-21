import { Box, Button, IconButton } from "@mui/material";
import { FC } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { LogOut } from "../auth/LogOut";

export const SignedInLinks: FC<{ username: string }> = ({ username = "nn" }) => {
  const initials = username.slice(0, 2).toUpperCase();
  const navigate = useNavigate();
  return (
    <Box sx={{display:"flex", gap:"6"}}>
      <Button
        variant="outlined"
        size="small"
        onClick={() => navigate("/spots/new")}
      >
        New Spot
      </Button>
      <LogOut />
      <IconButton
            size="small"
        sx={{
          color: "white",
          backgroundColor: "hsl(43, 86%, 42%)",
          marginLeft: "10",

        }}
      >
        {initials}
      </IconButton>
    </Box>
  );
};
