import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { object, string, TypeOf } from "zod";
import { useState } from "react";
import { SpotDocument, useUpdateSpotMutation } from "../../store/api/spotsApiSlice";
import { useLocation, useNavigate } from "react-router-dom";

export const UpdateSpotForm = () => {
  // Zod Schema

  const createSpotSchema = object({
    title: string().min(1, "Title is required"),
    location: string().min(1, "Location is required"),
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
      const updated = await updateSpot({...values,_id:spot._id}).unwrap();
      navigate(`/spots/${updated._id}`);
    } catch (e: any) {
      console.log(e);
      setUpdateSpotError(e.data);
    }
  };

  return (
    <div>
      <h2>Update Form</h2>
      <p>{updateSpotError}</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            defaultValue={spot.title}
            type="text"
            id="title"
            {...register("title")}
          />
          <p>{errors.title?.message}</p>
        </div>
        <div>
          <label htmlFor="location">Location:</label>
          <input
            defaultValue={spot.location}
            type="text"
            id="location"
            {...register("location")}
          />
          <p>{errors.location?.message}</p>
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            defaultValue={spot.description}
            id="description"
            cols={30}
            rows={10}
            {...register("description")}
          ></textarea>
          <p>{errors.description?.message}</p>
        </div>
        <button type="submit" disabled={!!Object.keys(errors).length && true}>
          Submit
        </button>
      </form>
    </div>
  );
};
