import React, { useEffect } from 'react';
import UseAuthService from './src/redux/store/services/useAuthServices'; // Corrected path
import { useNavigate,Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: any) => {
    const { isLoggedIn } = UseAuthService();
    if (!isLoggedIn) {
      return  <Navigate to="/login" replace />;
    }
    return <>{children}</>;
};

export default ProtectedRoute;