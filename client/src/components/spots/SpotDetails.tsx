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
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLazyGetCurrentUserQuery } from "../../store/api/authApiSlice";
import {
  useDeleteSpotMutation,
  useFindSpotQuery,
} from "../../store/api/spotsApiSlice";
import { useAppDispatch } from "../../store/hooks";
import { setSnackBar } from "../../store/notifications/notificationsSlice";
import { ReviewForm } from "../reviews/ReviewForm";
import { ReviewsList } from "../reviews/ReviewsList";
import { NotFound } from "./NotFound";

export const SpotDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data:spotData, isLoading, isSuccess, refetch } = useFindSpotQuery(id);
  const [getCurrentUser, resultsUser] = useLazyGetCurrentUserQuery();
  const [removeSpot] = useDeleteSpotMutation();
  const navigate = useNavigate(); const dispatch = useAppDispatch();

  const deleteSpot = async () => {
    try {
      await removeSpot(id).unwrap();
      navigate("/spots");
      dispatch(
        setSnackBar({
          snackBarOpen: true,
          snackBarType: "success",
          snackBarMessage: `Successfully deleted spot!`,
        })
      );
    } catch (e: any) {
      dispatch(
        setSnackBar({
          snackBarOpen: true,
          snackBarType: "warning",
          snackBarMessage: e.data || e.status,
        })
      );
    }
  };

  useEffect(() => {
    refetch();
    getCurrentUser();
  }, []);

  return isLoading ? (
    <Typography>Loading...</Typography>
  ) : isSuccess ? (
    <Box
      sx={{
        display: "flex",
        mx: "auto",
        width: "60%",
        height: "100%",
      }}
    >
      <Card variant="outlined" sx={{ width: "100%" }}>
        <Grid item md={8}>
          <CardMedia
            component="img"
            height="220"
            image={spotData.image}
            sx={{ objectFit: "fill" }}
          />
        </Grid>
        <Grid item md={4}>
          <CardContent>
            <Typography variant="h6">{spotData.title}</Typography>
            <Typography variant="body2">{spotData.location}</Typography>
            <Typography variant="body1" color="text.secondary">
              {spotData.description.slice(0, 280)}
            </Typography>
            <hr />
            <Typography variant="h6" fontSize={18}>Created by: {spotData.user.username}</Typography>
          </CardContent>
        </Grid>

        <CardActions>
          <Button
            variant="outlined"
            disabled={spotData.user._id !== resultsUser.data?._id}
            onClick={() => navigate("/spots/update", { state: { ...spotData } })}
          >
            Update
          </Button>
          <Button
            disabled={spotData.user._id !== resultsUser.data?._id}
            variant="outlined"
            color="error"
            onClick={deleteSpot}
          >
            Delete
          </Button>
        </CardActions>
      </Card>

      <Card variant="outlined" sx={{ width: "100%" }}>
        <Grid item md={4}>
          <CardMedia
            component="img"
            height="220"
            // image={data.image}
            sx={{ objectFit: "fill" }}
          />
        </Grid>
        <Grid item md={8}>
          <CardContent>
            {/* <ReviewForm spotId={id as string} refetch={refetch} /> */}
            <ReviewForm spot={spotData} />
            <ReviewsList spot={spotData}/>
          </CardContent>
        </Grid>
      </Card>
    </Box>
  ) : (
    <NotFound message="Cannot find that spot!" />
  );
};
