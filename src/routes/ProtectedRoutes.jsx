import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../shared/utils/auth';

const ProtectedRoute = (WrappedComponent, allowedUserType) => {
  const AuthWrapper = (props) => {
    const userType = isAuthenticated()?.type;
    const isAuthenticatedUser = isAuthenticated();

    if (isAuthenticatedUser) {
      if (userType === allowedUserType) {
        return <WrappedComponent {...props} />;
      } else {
        return <Navigate to="/" />;
      }
    } else {
      return <Navigate to="/" />;
    }
  };
  return AuthWrapper;
};

export default ProtectedRoute;
