import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useGetCurrentUserQuery } from "../../store/api/authApiSlice";
import { SignedInLinks } from "./SignedInLinks";
import { SignedOutLinks } from "./SignedOutLinks";

export const NavBar = () => {
  const { data, isLoading, isSuccess, refetch } = useGetCurrentUserQuery();
  useEffect(() => {
    refetch();
  }, [data]);
  return (
    <div>
      Tourist-Spots
      <Link to="/spots"> Spots </Link>
      {isLoading ? (
        <p>Loading...</p>
      ) : isSuccess ? (
        <SignedInLinks />
      ) : (
        <SignedOutLinks />
      )}
    </div>
  );
};
