import React from 'react'

import { Navigate } from 'react-router-dom'

export default function ProtectRouteInstructor({roleApp,children}) {
 
   if(roleApp !== "Instructor"){
        console.log("false")
        return <Navigate to="/"/>
        
    } else{
        console.log("true")
        return children
    }
    
  
}
