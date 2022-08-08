import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Rating,
  Typography,
} from "@mui/material";
import { FC } from "react";
import {
  useGetCurrentUserQuery,
} from "../../store/api/authApiSlice";
import { useDeleteReviewMutation } from "../../store/api/reviewsApiSlice";
import { SpotDocument, useFindSpotQuery } from "../../store/api/spotsApiSlice";
import { useAppDispatch } from "../../store/hooks";
import { setSnackBar } from "../../store/notifications/notificationsSlice";

export const ReviewsList: FC<{ spot: SpotDocument }> = ({ spot }) => {
  const [deleteReview] = useDeleteReviewMutation();
  const { refetch } = useFindSpotQuery(spot._id);
  const { data: session } = useGetCurrentUserQuery();
  const dispatch = useAppDispatch();

  const handleDelete = async (reviewId: string) => {
    try {
      await deleteReview({ spotId: spot._id, reviewId }).unwrap();
      refetch();
      dispatch(
        setSnackBar({
          snackBarOpen: true,
          snackBarType: "success",
          snackBarMessage: `Successfully deleted review!`,
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

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {spot.reviews.map((review) => (
        <Card variant="outlined" key={review._id}>
          <CardContent>
            <Typography variant="h6">{review.user.username}</Typography>
            <Rating readOnly value={review.rating} />
            <Typography variant="body1">{review.comment}</Typography>
          </CardContent>
          <CardActions>
            {review.user._id === session?._id && (
              <Button
                onClick={() => handleDelete(review._id)}
                variant="contained"
                color="error"
                size="small"
              >
                Delete
              </Button>
            )}
          </CardActions>
        </Card>
      ))}
    </Box>
  );
};
