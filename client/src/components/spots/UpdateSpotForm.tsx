import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { object, string, TypeOf } from "zod";
import { useState } from "react";
import {
  SpotDocument,
  useUpdateSpotMutation,
} from "../../store/api/spotsApiSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Button, Container, TextField, Typography } from "@mui/material";

export const UpdateSpotForm = () => {
  // Zod Schema

  const createSpotSchema = object({
    title: string().min(1, "Title is required"),
    location: string().min(1, "Location is required"),
    image: string().min(1, "Image is required"),
    description: string({ required_error: "Description is required" }).min(
      15,
      "Minumum 15 chars required"
    ),
  });
  type CreateSpotType = TypeOf<typeof createSpotSchema>;
  type LocationState = {
    state: SpotDocument;
  };
  const location = useLocation() as LocationState;
  const spot = location.state;

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateSpotType>({ resolver: zodResolver(createSpotSchema) });

  const navigate = useNavigate();
  const [updateSpotError, setUpdateSpotError] = useState("");
  const [updateSpot] = useUpdateSpotMutation();

  const onSubmit = async (values: CreateSpotType) => {
    try {
      const updated = await updateSpot({ ...values, _id: spot._id }).unwrap();
      navigate(`/spots/${updated._id}`);
    } catch (e: any) {
      console.log(e);
      setUpdateSpotError(e.data || e.status);
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Update Form
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <TextField
            label="title"
            defaultValue={spot.title}
            fullWidth
            autoFocus
            required
            {...register("title")}
            error={!!errors.title}
            helperText={errors.title?.message}
          />
          <TextField
            label="location"
            defaultValue={spot.location}
            fullWidth
            required
            {...register("location")}
            error={!!errors.location}
            helperText={errors.location?.message}
          />
          <TextField
            label="image"
            defaultValue={spot.image}
            fullWidth
            required
            {...register("image")}
            error={!!errors.image}
            helperText={errors.image?.message}
          />
          <TextField
            label="description"
            defaultValue={spot.description}
            multiline
            rows={4}
            fullWidth
            required
            {...register("description")}
            error={!!errors.description}
            helperText={errors.description?.message}
          />
          <Button variant="contained" color="info" fullWidth type="submit">
            Update
          </Button>
          <Typography color="error">{updateSpotError}</Typography>
        </Box>
      </form>
    </Container>
  );
};
