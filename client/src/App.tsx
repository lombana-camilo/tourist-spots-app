import { Routes, Route } from "react-router-dom";
import { Typography } from "@mui/material";
import { Layout } from "./components/layout/Layout";
import { Spots } from "./components/Spots";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public Routes */}
        <Route path="/spots" element={<Spots />} />

        {/* Protected Routes */}

        {/* <Route element={<RequireAuth />}> */}
          {/* <Route path="/protected" element={<Protected />} /> */}
        {/* </Route> */}

      </Route>
    </Routes>
  );
}

export default App;
