import { Typography, Button } from "@mui/material";
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
        <div key={spot._id}>
          <h2>{spot.title}</h2>
        </div>
      ))}
           <Button variant="outlined">button</Button>
    </div>
  ) : (
    <p>Failed to load</p>
  );
};
