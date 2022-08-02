import { Link } from 'react-router-dom'
import { SignedInLinks } from './SignedInLinks'
import { SignedOutLinks } from './SignedOutLinks'

export const NavBar = () => {
   return (
      <div>
         Tourist-Spots
         <Link to="/spots"> Spots </Link>
         <SignedInLinks/>
         <SignedOutLinks/>
      </div>
   )
}
