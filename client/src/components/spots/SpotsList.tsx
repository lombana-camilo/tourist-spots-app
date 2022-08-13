import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
} from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFetchSpotsQuery } from "../../store/api/spotsApiSlice";
import { MapCluster } from "../maps/MapCluster";
import { NotFound } from "./NotFound";

export const SpotsList = () => {
  const { data, isLoading, isSuccess, refetch } = useFetchSpotsQuery();
  const navigate = useNavigate();

  useEffect(() => {
    refetch();
  }, []);

  return isLoading ? (
    <Typography>Loading...</Typography>
  ) : isSuccess ? (
    <>
      <MapCluster spots={data}/>
      <Grid container direction="column" sx={{mt:2}}>
        {data.map((spot) => (
          <Card key={spot._id} sx={{ mb: 3,  display: "flex" }}>
            <Grid item md={4}>
              <CardMedia
                component="img"
                height="220"
                image={spot.images.length ? spot.images[0].url : ""}
                sx={{ objectFit: "fill" }}
              />
            </Grid>
            <Grid item md={8}>
              <CardContent>
                <Typography variant="h6">{spot.title}</Typography>
                <Typography variant="body1" gutterBottom>
                  {spot.description.slice(0, 280)}
                </Typography>
                <Typography variant="body2" color="gray">
                  {spot.location}
                </Typography>
                <Button
                  color="secondary"
                  variant="outlined"
                  onClick={() => navigate(`/spots/${spot._id}`)}
                >
                  View {spot.title}
                </Button>
              </CardContent>
            </Grid>
          </Card>
        ))}
      </Grid>
    </>
  ) : (
    <NotFound message="Failed to load Spots" />
  );
};
