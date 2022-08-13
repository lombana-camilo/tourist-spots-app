import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { SpotDetails } from "./components/spots/SpotDetails";
import { CreateSpotForm } from "./components/spots/CreateSpotForm";
import { UpdateSpotForm } from "./components/spots/UpdateSpotForm";
import { SignUp } from "./components/auth/SignUp";
import { Login } from "./components/auth/Login";
import { RequireAuth } from "./components/RequireAuth";
import { NotFound } from "./components/spots/NotFound";
import { SpotsList } from "./components/spots/SpotsList";
import { LandingPage } from "./components/LandingPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/" element={<Layout />}>
        {/* Public Routes */}
        <Route path="/spots" element={<SpotsList />} />
        <Route path="/spots/:id" element={<SpotDetails />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}

        <Route element={<RequireAuth />}>
          <Route path="/spots/new" element={<CreateSpotForm />} />
          <Route path="/spots/update" element={<UpdateSpotForm />} />
        </Route>
        {/* not found */}
        <Route
          path="/*"
          element={
            <NotFound message="The page you are looking does not exist" />
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
