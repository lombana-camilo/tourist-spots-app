import { Container } from "@mui/system";
import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import { NavBar } from "./NavBar";
import { SnackNotification } from "./SnackNotification";

export const Layout = () => {
  return (
    <>
      <NavBar />
      <SnackNotification />
      <Container sx={{ my: 10 }}>
        <Outlet />
      </Container>
      <Footer />
    </>
  );
};
