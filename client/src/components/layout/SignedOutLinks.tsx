import { Link } from 'react-router-dom'
import { LogOut } from '../auth/LogOut'

export const SignedOutLinks = () => {
   return (
      <div>
         <Link to="/signup"> SignUp </Link>
         <Link to="/login"> Login </Link>
      </div>
   )
}

