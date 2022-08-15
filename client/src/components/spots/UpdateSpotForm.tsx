import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { custom, object, string, TypeOf } from "zod";
import {
  SpotDocument,
  useUpdateSpotMutation,
} from "../../store/api/spotsApiSlice";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardMedia,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { setSnackBar } from "../../store/notifications/notificationsSlice";
import { useAppDispatch } from "../../store/hooks";

export const UpdateSpotForm = () => {
  // Zod Schema

  const createSpotSchema = object({
    title: string().min(1, "Title is required"),
    location: string().min(1, "Location is required"),
    images: custom(),
    deleteImages: custom(),
    description: string({ required_error: "Description is required" }).min(
      15,
      "Minumum 15 chars required"
    ),
  });
  type UpdateSpotType = TypeOf<typeof createSpotSchema>;
  type LocationState = {
    state: SpotDocument;
  };
  const location = useLocation() as LocationState;
  const spot = location.state;

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<UpdateSpotType>({ resolver: zodResolver(createSpotSchema) });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [updateSpot, resultsUpdate] = useUpdateSpotMutation();

  const onSubmit = async (values: UpdateSpotType) => {
    try {
      //Set image
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("location", values.location);
      formData.append("description", values.description);

      if (values.images.length !== 0) {
        for (let i = 0; i < values.images?.length; i++) {
          formData.append("images", values.images[i]);
        }
      }

      //deleteimages returns [0,1,many]=>[false,string,[]] respectively
      if (values.deleteImages) {
        if (typeof values.deleteImages === "string") {
          values.deleteImages = [values.deleteImages];
        }
        for (let i = 0; i < values.deleteImages.length; i++) {
          formData.append("deleteImages[]", values.deleteImages[i]);
        }
      }

      const updated = await updateSpot({
        _id: spot._id,
        formData,
      }).unwrap();
      navigate(`/spots/${updated._id}`);
      dispatch(
        setSnackBar({
          snackBarOpen: true,
          snackBarType: "success",
          snackBarMessage: `Spot updated successfully!`,
        })
      );
    } catch (e: any) {
      console.log({ e });
      dispatch(
        setSnackBar({
          snackBarOpen: true,
          snackBarType: "warning",
          snackBarMessage: e.data || e.status || e.message,
        })
      );
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Update Spot
      </Typography>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        encType="multipart/form-data"
      >
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
          <Button variant="outlined" component="label" color="primary">
            Add more Images
            <input type="file" {...register("images")} multiple hidden />
          </Button>

          <Grid container>
            {spot.images.map((img) => (
              <Card key={img.url} sx={{ mb: 3, display: "flex" }}>
                <Grid item md={8}>
                  <CardMedia
                    component="img"
                    height="300"
                    image={img.url}
                    sx={{ objectFit: "fill" }}
                  />
                </Grid>
                <CardActions>
                  <FormControlLabel
                    label="Delete?"
                    {...register("deleteImages")}
                    control={
                      <Checkbox name="deleteImages[]" value={img.filename} />
                    }
                  />
                </CardActions>
              </Card>
            ))}
          </Grid>

          {resultsUpdate.isLoading ? (
            <Button variant="contained" color="info" fullWidth type="submit">
              Loading...
            </Button>
          ) : (
            <Button variant="contained" color="info" fullWidth type="submit">
              Update
            </Button>
          )}
        </Box>
      </form>
    </Container>
  );
};
