import { Container } from "@mui/system";
import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import { NavBar } from "./NavBar";

export const Layout = () => {
  return (
    <>
      <NavBar />
      <Container sx={{ marginTop: 10 }}>
        <Outlet />
      </Container>
      <Footer />
    </>
  );
};
