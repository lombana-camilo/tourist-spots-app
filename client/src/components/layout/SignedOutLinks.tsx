import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const SignedOutLinks = () => {
   const navigate = useNavigate()
  return (
    <div>
      <Button variant="outlined" onClick={() => navigate("/signup")}>SignUp</Button>
      <Button variant="outlined" onClick={() => navigate("/login")}>Login</Button>
    </div>
  );
};
