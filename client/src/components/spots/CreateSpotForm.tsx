import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { object, string, TypeOf } from "zod";
import { useState } from "react";
import { useCreateSpotMutation } from "../../store/api/spotsApiSlice";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";

export const CreateSpotForm = () => {
  // Zod Schema
  const createSpotSchema = object({
    title: string().min(1, "Title is required"),
    image: string().min(1, "Image is required"),
    location: string().min(1, "Location is required"),
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
  const [createSpotError, setCreateSpotError] = useState("");
  const [createSpot] = useCreateSpotMutation();

  const onSubmit = async (values: CreateSpotType) => {
    try {
      const newSpot = await createSpot(values).unwrap();
      navigate(`/spots/${newSpot._id}`);
    } catch (e: any) {
      console.log(e);
      setCreateSpotError(e.data || e.status);
    }
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Create new spot
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
            label="image"
            fullWidth
            required
            {...register("image")}
            error={!!errors.image}
            helperText={errors.image?.message}
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
          <Button variant="contained" color="success" fullWidth type="submit">
            Create Spot
          </Button>
          <Typography color="error">{createSpotError}</Typography>
        </Box>
      </form>
    </Box>
  );
};
