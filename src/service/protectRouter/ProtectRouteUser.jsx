import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectRouteUser({role,children}) {
    try{
    if(role.toUpperCase().trim().localeCompare('"User"', undefined, { sensitivity: 'base' }) === 0){
        return children
    }
}catch{
    return <Navigate to="/"/>
}
  return <Navigate to="/"/>
}
