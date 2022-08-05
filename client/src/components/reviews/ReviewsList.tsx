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

interface ReviewDocument {
  comment: string;
  rating: number;
  _id: string;
}
interface Props {
  reviews: ReviewDocument[];
}

export const ReviewsList: FC<Props> = ({ reviews }) => {
  const handleDelete = async () => {};

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
              onClick={handleDelete}
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
