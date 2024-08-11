import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";
import { getCookies } from "../utils/cookies";
import useAuthHook from "../hooks/useAuthHook";

const ProtectedRoute = (WrappedComponent, allowedUserType) => {
  const AuthWrapper = (props) => {
    const isAuthenticated = useAuthHook(false);

    const userType = isAuthenticated?.type;
    const isAuthenticatedUser = !!isAuthenticated;

    if (isAuthenticated === false) {
      return null;
    }

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
