import { Navigate, Route, useLocation } from "react-router-dom";
import useFetchUser from "./hooks/useFetchUser";
import { AccessDenied } from "./pages/public-pages/AccessDenied";
import Layout from "./app/layout/Layout";

interface Props {
  component: React.ComponentType;
  path?: string;
  userType: string;
}

export const PrivateRoute: React.FC<Props> = ({ component: RouteComponent, userType }) => {
  const currentUserType = localStorage.getItem("userType");
  const isLoggedIn = localStorage.getItem("token");
  const userIsAuthorized = currentUserType === userType;

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
