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
import { useDispatch } from "react-redux";
import { useDeleteReviewMutation } from "../../store/api/reviewsApiSlice";
import { useFindSpotQuery } from "../../store/api/spotsApiSlice";
import { setSnackBar } from "../../store/notifications/notificationsSlice";

interface ReviewDocument {
  comment: string;
  rating: number;
  _id: string;
}
interface Props {
  reviews: ReviewDocument[];
  spotId: string;
}

export const ReviewsList: FC<Props> = ({ reviews, spotId }) => {
  const [deleteReview] = useDeleteReviewMutation();
  const { refetch } = useFindSpotQuery(spotId);
   const dispatch = useDispatch()

  const handleDelete = async (reviewId: string) => {
    try {
      await deleteReview({ spotId, reviewId }).unwrap();
      refetch();
      dispatch(
        setSnackBar({
          snackBarOpen: true,
          snackBarType: "success",
          snackBarMessage: `Successfully deleted review!`,
        })
      );
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {reviews.map((review) => (
        <Card variant="outlined" key={review._id}>
          <CardContent>
            <Typography variant="h6">Author</Typography>
            <Rating readOnly value={review.rating} />
            <Typography variant="body1">{review.comment}</Typography>
          </CardContent>
          <CardActions>
            <Button
              onClick={() => handleDelete(review._id)}
              variant="contained"
              color="error"
              size="small"
            >
              Delete
            </Button>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
};
