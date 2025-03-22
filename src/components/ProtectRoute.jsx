import React from 'react';
import { UserAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

export default function ProtectRoute({ children }) {
    
    const { session } = UserAuth();
    
    return (
        <>
            { session ? <>{children}</> : <Navigate to="/" />};
        </>
    )
}
