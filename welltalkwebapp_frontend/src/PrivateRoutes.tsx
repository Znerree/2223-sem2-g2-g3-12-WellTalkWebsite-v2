import { Navigate, Route, useLocation } from "react-router-dom";
import useFetchUser from "./hooks/useFetchUser";
import { AccessDenied } from "./pages/AccessDenied";
import Layout from "./components/Layout";

interface Props {
  component: React.ComponentType;
  path?: string;
  userType: string;
}

export const PrivateRoute: React.FC<Props> = ({ component: RouteComponent, userType }) => {
  const { user } = useFetchUser();
  const isLoggedIn = localStorage.getItem("token");
  const userIsAuthorized = user?.userType === userType;

  if (isLoggedIn && userIsAuthorized) {
    //User is authorized
    return (
      <Layout>
        <RouteComponent />
      </Layout>
    );
  }

  if (isLoggedIn && !userIsAuthorized) {
    //User is logged in but not authorized
    return <AccessDenied />;
  }

  // User is not logged in
  return <Navigate to="/login" />;
};
