import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useDeleteSpotMutation,
  useFindSpotQuery,
} from "../../store/api/spotsApiSlice";

export const SpotDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isSuccess, refetch } = useFindSpotQuery(id);
  const [removeSpot] = useDeleteSpotMutation();
  // const {  } = useDeleteSpotMutation();
  const navigate = useNavigate();

  const deleteSpot = async () => {
    try {
      await removeSpot(id).unwrap();
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
      <h2>{data.title}</h2>
      <img src={data.image} alt="" />
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
