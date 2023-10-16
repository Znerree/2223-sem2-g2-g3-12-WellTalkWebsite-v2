import { Navigate } from "react-router-dom";
import useFetchUser from "./hooks/useFetchUser";
import { AccessDenied } from "./pages/AccessDenied";
import useLoading from "./hooks/useLoading";
import { LoadingScreen, ProgressBar } from "./components/Loading";

interface Props {
  component: React.ComponentType;
  path?: string;
  userType: string;
}

export const PrivateRoute: React.FC<Props> = ({ component: RouteComponent, userType }) => {
  const { user } = useFetchUser();
  const { loading } = useLoading();
  const isLoggedIn = localStorage.getItem("token");
  if (loading) {
    return <ProgressBar />;
  }
  const userIsAuthorized = user?.userType === userType;

  if (isLoggedIn && userIsAuthorized) {
    //User is authorized
    return <RouteComponent />;
  }

  if (isLoggedIn && !userIsAuthorized) {
    //User is logged in but not authorized
    return <AccessDenied />;
  }

  // User is not logged in
  return <Navigate to="/login" />;
};
