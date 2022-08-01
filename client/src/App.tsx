import { Routes, Route } from "react-router-dom";
import { Typography } from "@mui/material";
import { Layout } from "./components/layout/Layout";
import { Spots } from "./components/spots/Spots";
import { SpotDetails } from "./components/spots/SpotDetails";
import { CreateSpotForm } from "./components/spots/CreateSpotForm";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public Routes */}
        <Route path="/spots" element={<Spots />} />
        <Route path="/spots/:id" element={<SpotDetails />} />
        <Route path="/spots/new" element={<CreateSpotForm />} />

        {/* Protected Routes */}

        {/* <Route element={<RequireAuth />}> */}
          {/* <Route path="/protected" element={<Protected />} /> */}
        {/* </Route> */}

      </Route>
    </Routes>
  );
}

export default App;
