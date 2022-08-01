import { useParams } from "react-router-dom";
import { useFindSpotQuery } from "../../store/api/apiSlice";

export const SpotDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isSuccess } = useFindSpotQuery(id);

  return isLoading ? (
    <p>Loading...</p>
  ) : isSuccess ? (
    <div>
      Spot Details
      <h2>Title</h2>
      <div>{data.title}</div>
      <h2>Description</h2>
      <div>{data.description}</div>
    </div>
  ) : (
    <p>Failed to load</p>
  );
};
