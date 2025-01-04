import React, { useEffect } from 'react'
import { useState } from 'react'
import instance from '../axiosConfig.js';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/Auth.jsx';

function ProtectedRoute({children}) {

    const { isAuthenticated,loading} = useAuth();
    if (loading) return <h3>Loading...</h3>;
    return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute
