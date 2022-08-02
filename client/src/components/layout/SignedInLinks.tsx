import { Link } from 'react-router-dom'
import { LogOut } from '../auth/LogOut'

export const SignedInLinks = () => {
   return (
      <div>
         <Link to="/spots/new"> New Spot </Link>
         <Link to="/"> <LogOut/> </Link>
      </div>
   )
}
