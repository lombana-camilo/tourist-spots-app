import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import landingImg from "./../assets/landing.jpg";

export const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: `url(${landingImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "200",
          height: "50vh",
          backdropFilter: "blur(2px)",
        }}
      >
        <Typography variant="h4">Welcome to</Typography>
        <Typography variant="h1" fontWeight={500}>
          Tourist-Spots
        </Typography>
        <Typography variant="body1" fontSize="1.5rem">
          Explore or publish outstanding sightseeing spots across the world
        </Typography>
        <Button
          variant="contained"
          color="warning"
          size="large"
          onClick={() => navigate("/spots")}
        >
          Get Started
        </Button>
      </Box>
    </Box>
  );
};
