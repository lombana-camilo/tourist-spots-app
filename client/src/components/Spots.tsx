import { Typography } from "@mui/material";
import axios from "axios";
import { useFetchSpotsQuery } from "../store/api/apiSlice";

export const Spots = () => {
  const { data, isLoading, isSuccess } = useFetchSpotsQuery();

  return isLoading ? (
    <p>Loading...</p>
  ) : isSuccess ? (
    <div>
      <Typography variant="h1">Lists of Spots</Typography>
      {data.map((spot) => (
        <h2>{spot.title}</h2>
      ))}
    </div>
  ) : (
    <p>Failed to load</p>
  );
};
