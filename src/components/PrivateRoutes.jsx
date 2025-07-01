import { Navigate } from 'react-router-dom';
import { useUserDetails } from '../shared/hooks';

export const PrivateRoute = ({ children, allowedRoles = [] }) => {
    const { isLogged, role } = useUserDetails();
  
    if (!isLogged) return <Navigate to="/auth" replace />;
    if (allowedRoles.length > 0 && !allowedRoles.includes(role.toUpperCase())) {
      return <Navigate to="/dashboard" replace />;
    }
  
    return children;
  };
