import React from 'react';
import { useNavigate, useParams, Navigate } from 'react-router-dom';
import UseAuthService from '@application/redux/store/services/useAuthServices';

const ProtectedRoute = ({ children }: any) => {
  const { isLoggedIn } = UseAuthService();
  const { event} = useParams();

  if (!event) {
    return <Navigate to="/404" replace />; // Handle the case where eventName is not present
  }

  if (!isLoggedIn) {
    return <Navigate to={`/${event}/login`} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
