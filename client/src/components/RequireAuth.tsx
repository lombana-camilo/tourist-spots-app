import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useGetCurrentUserQuery } from "../store/api/authApiSlice"

export const RequireAuth = () => {
   const {isLoading,isSuccess} = useGetCurrentUserQuery()
   const location  = useLocation()

   return (
      isLoading 
      ?<p>Loading...</p>
      :isSuccess 
         ? <Outlet/>
         : <Navigate to='/login' state={{from: location}} replace/>
   )
}
