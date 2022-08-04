import { Button, Rating, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const ReviewForm = () => {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm();

  const [rating, setRating] = useState<number | null>(0);

  const onSubmit = (comment: any) => {
    // console.log(comment{comment:any});
  };

  return (
    <>
      <Typography variant="h6">Leave a Review</Typography>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Rating
          precision={1}
          defaultValue={5}
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
