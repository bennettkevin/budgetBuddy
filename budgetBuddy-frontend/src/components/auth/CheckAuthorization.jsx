import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext.jsx';

function CheckAuthorization() {
  const { isAuthenticated, isLoading } = useAuth(); 
  const location = useLocation();

  // Show loading screen while checking auth.
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // If not authenticated then redirect to home page.
  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // If authenticated proced to the other pages. Outlet is used with routes to render child components.
  return <Outlet />;
}

export default CheckAuthorization;
