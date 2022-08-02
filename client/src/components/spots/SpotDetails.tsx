import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useDeleteSpotMutation,
  useFindSpotQuery,
} from "../../store/api/spotsApiSlice";

export const SpotDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isSuccess, refetch } = useFindSpotQuery(id);
  const [ removeSpot ] = useDeleteSpotMutation();
  const navigate = useNavigate();

  const deleteSpot = async () => {
    try {
      const a = await removeSpot(id).unwrap()
         console.log(a)
      navigate("/spots");
    } catch (e) {
      console.log(e);
    }
  };

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
      <button onClick={deleteSpot}>Delete Spot</button>
    </div>
  ) : (
    <p>Failed to load</p>
  );
};
