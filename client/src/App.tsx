import { Routes, Route } from "react-router-dom";
import { Typography } from "@mui/material";
import { Layout } from "./components/layout/Layout";
import { Spots } from "./components/Spots";
import { SpotDetails } from "./components/SpotDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public Routes */}
        <Route path="/spots" element={<Spots />} />
        <Route path="/spots/:id" element={<SpotDetails />} />

        {/* Protected Routes */}

        {/* <Route element={<RequireAuth />}> */}
          {/* <Route path="/protected" element={<Protected />} /> */}
        {/* </Route> */}

      </Route>
    </Routes>
  );
}

export default App;
