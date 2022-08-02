import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useFindSpotQuery } from "../../store/api/spotsApiSlice";

export const SpotDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isSuccess, refetch } = useFindSpotQuery(id);

  useEffect(() => {
    refetch();
  }, []);

  return isLoading ? (
    <p>Loading...</p>
  ) : isSuccess ? (
    <div>
      Spot Details
      <h2>Title</h2>
      <div>{data.title}</div>
      <h2>Description</h2>
      <div>{data.description}</div>
      <Link to="/spots/update" state={{ ...data }}>
        Update Data
      </Link>
    </div>
  ) : (
    <p>Failed to load</p>
  );
};
