import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { custom, object, string, TypeOf } from "zod";
import { useState } from "react";
import { useCreateSpotMutation } from "../../store/api/spotsApiSlice";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { setSnackBar } from "../../store/notifications/notificationsSlice";

export const CreateSpotForm = () => {
  // Zod Schema
  const createSpotSchema = object({
    title: string().min(1, "Title is required"),
    location: string().min(1, "Location is required"),
    images: custom(),
    description: string({ required_error: "Description is required" }).min(
      20,
      "Minumum 20 chars required"
    ),
  });
  type CreateSpotType = TypeOf<typeof createSpotSchema>;

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateSpotType>({ resolver: zodResolver(createSpotSchema) });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [createSpot] = useCreateSpotMutation();

  // console.log({ errors });
  const onSubmit = async (values: CreateSpotType) => {
    try {
      //Set image
      console.log({ values });
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("location", values.location);
      formData.append("description", values.description);

      if (!values.images.length) {
          formData.append("images[]", "");
      } else {
        for (let i = 0; i < values.images.length; i++) {
          formData.append("images", values.images[i]);
        }
      }

      console.log("images", values.images);
      const newSpot = await createSpot(formData).unwrap();
      navigate(`/spots/${newSpot._id}`);
      dispatch(
        setSnackBar({
          snackBarOpen: true,
          snackBarType: "success",
          snackBarMessage: `Spot created successfully!`,
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
    <Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Create new spot
      </Typography>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        encType="multipart/form-data"
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <TextField
            label="title"
            autoFocus
            fullWidth
            required
            {...register("title")}
            error={!!errors.title}
            helperText={errors.title?.message}
          />
          <TextField
            label="location"
            fullWidth
            required
            {...register("location")}
            error={!!errors.location}
            helperText={errors.location?.message}
          />
          <TextField
            label="description"
            multiline
            rows={4}
            fullWidth
            required
            {...register("description")}
            error={!!errors.description}
            helperText={errors.description?.message}
          />
          <Button variant="outlined" component="label" color="primary">
            Upload Images
            <input type="file" {...register("images")} multiple hidden />
          </Button>
          <Button variant="contained" color="success" fullWidth type="submit">
            Create Spot
          </Button>
        </Box>
      </form>
    </Box>
  );
};
