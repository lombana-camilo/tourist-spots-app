import React from 'react'
import { Link } from 'react-router-dom'

export const NavBar = (props : {}) => {
   return (
      <div>
         Tourist-Spots
         <Link to="/spots"> Spots </Link>
         <Link to="/spots/new"> New Spot </Link>
         <Link to="/signup"> SignUp</Link>
      </div>
   )
}
