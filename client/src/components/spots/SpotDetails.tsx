import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useDeleteSpotMutation,
  useFindSpotQuery,
} from "../../store/api/spotsApiSlice";

export const SpotDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isSuccess, refetch } = useFindSpotQuery(id);
  const [removeSpot] = useDeleteSpotMutation();
  const navigate = useNavigate();
  const [authError, setAuthError] = useState("");

  const deleteSpot = async () => {
    try {
      await removeSpot(id).unwrap();
      navigate("/spots");
    } catch (e: any) {
      setAuthError(e.data || e.status);
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  return isLoading ? (
    <Typography>Loading...</Typography>
  ) : isSuccess ? (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        mx: "auto",
        width: "50%",
        height: "100%",
      }}
    >
      <Card variant="outlined">
        <Grid item md={8}>
          <CardMedia
            component="img"
            height="220"
            image={data.image}
            sx={{ objectFit: "fill" }}
          />
        </Grid>
        <Grid item md={4}>
          <CardContent>
            <Typography variant="h6">{data.title}</Typography>
            <Typography variant="body2">{data.location}</Typography>
            <Typography variant="body1" color="text.secondary">
              {data.description.slice(0, 280)}
            </Typography>
          </CardContent>
        </Grid>

        <CardActions>
          <Button
            onClick={() => navigate("/spots/update", { state: { ...data } })}
          >
            Update
          </Button>
          <Button color="error" onClick={deleteSpot}>
            Delete
          </Button>
        </CardActions>
      </Card>
      <Typography color="error">{authError}</Typography>
    </Box>
  ) : (
    <Typography color="error">Failed to load</Typography>
  );
};
