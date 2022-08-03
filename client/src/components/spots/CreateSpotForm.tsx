import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { object, string, TypeOf } from "zod";
import { useState } from "react";
import { useCreateSpotMutation } from "../../store/api/spotsApiSlice";
import { useNavigate } from "react-router-dom";

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
      setCreateSpotError(e.error);
    }
  };

  return (
    <div>
      <h2>Create newSpot</h2>
      <p>{createSpotError}</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" {...register("title")} />
          <p>{errors.title?.message}</p>
        </div>
        <div>
          <label htmlFor="location">Location:</label>
          <input type="text" id="location" {...register("location")} />
          <p>{errors.location?.message}</p>
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
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
