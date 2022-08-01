import { Typography, Button } from "@mui/material";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useFetchSpotsQuery } from "../../store/api/spotsApiSlice";

export const Spots = () => {
  const { data, isLoading, isSuccess, refetch} = useFetchSpotsQuery();

  useEffect(() => {
    refetch();
  }, []);

  return isLoading ? (
    <p>Loading...</p>
  ) : isSuccess ? (
    <div>
      <Typography variant="h1">Lists of Spots</Typography>
      {data.map((spot) => (
        <div key={spot._id}>
          <Link to={`${spot._id}`}>
            <h2>{spot.title}</h2>
          </Link>
        </div>
      ))}
      <Button variant="outlined">button</Button>
    </div>
  ) : (
    <p>Failed to load</p>
  );
};
