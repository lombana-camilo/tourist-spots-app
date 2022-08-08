import { Button, Rating, TextField, Typography } from "@mui/material";
import { get } from "lodash";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { useCreateReviewMutation } from "../../store/api/reviewsApiSlice";
import { SpotDocument, useFindSpotQuery } from "../../store/api/spotsApiSlice";
import { useAppDispatch } from "../../store/hooks";
import { setSnackBar } from "../../store/notifications/notificationsSlice";

export const ReviewForm: FC<{spot:SpotDocument}> = ({spot}) => {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm();

   const dispatch = useAppDispatch()
  const [rating, setRating] = useState<number | null>(3);
  const [createReview] = useCreateReviewMutation();
  const {refetch} = useFindSpotQuery(spot._id)

  const onSubmit = async (values: any) => {
    try {
      const comment = get(values, "comment");
      const rat = rating as number;
      await createReview({ comment, rating: rat, spotId:spot._id }).unwrap();
      refetch();
      dispatch(
        setSnackBar({
          snackBarOpen: true,
          snackBarType: "success",
          snackBarMessage: `Created new review!`,
        })
      );
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Typography variant="h6">Leave a Review</Typography>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Rating
          precision={1}
          defaultValue={3}
          onChange={(_, value: number | null) => setRating(value)}
        />
        <TextField
          label="Review Comment"
          {...register("comment", { required: true })}
          multiline
          rows={3}
          error={!!errors.comment}
          required
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="outlined" color="success">
          Submit
        </Button>
      </form>
    </>
  );
};
