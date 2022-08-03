import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { LogOut } from "../auth/LogOut";

export const SignedInLinks = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Button variant="outlined" onClick={() => navigate("/spots/new")}>New Spot</Button>
      {/* <Button onClick={() => navigate("/spots")}><LogOut /></Button> */}
      <LogOut />
    </div>
  );
};
