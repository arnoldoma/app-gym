import React from 'react'
import { Navigate } from 'react-router-dom'

export const RouterPrivate = ({ children }) => {
    const user = JSON.parse(localStorage.getItem('userLogin')) || null

    if (user) {
        return children ;
    }else{
        return <Navigate to="/"></Navigate>
    }
}
