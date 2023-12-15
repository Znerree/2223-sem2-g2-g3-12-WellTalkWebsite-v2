import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import About from "./pages/public-pages/About";
import Calendarpage from "./pages/private-pages/Calendarpage";
import Register from "./pages/public-pages/Register";
import Dashboard from "./pages/private-pages/Dashboard";
import Students from "./pages/private-pages/Students";
import Login from "./pages/public-pages/Login";
import EmailChecker from "./pages/public-pages/EmailChecker";
import { StudentReferral } from "./pages/private-pages/StudentReferral";
import Home from "./pages/private-pages/Home";
import Notes from "./pages/private-pages/Notes";
import { PrivateRoute } from "./PrivateRoutes";
import EmergencyLink from "./pages/public-pages/EmergencyLink";
import useGetCurrentPath from "./hooks/useGetCurrentPath";
import Homepage from "./pages/public-pages/Homepage";
import PageNotFound from "./pages/errors/PageNotFound";
import DefaultLayout from "./components/layouts/DefaultLayout";
import CounselorLayout from "./components/layouts/CounselorLayout";
import { Alert, AlertDescription, AlertTitle } from "./components/ui/alert";
import { BsExclamationTriangle } from "react-icons/bs";
import { Button } from "./components/ui/button";
import { useAuth } from "./contexts/AuthContext";
import TeacherLayout from "./components/layouts/TeacherLayout";
import { AccessDenied } from "./pages/errors/AccessDenied";

export default function App() {
  const location = useLocation();
  const [isTokenExpired, setIsTokenExpired] = useState(false);

  const { currentPathName } = useGetCurrentPath();

  useEffect(() => {
    // Function to clear local storage when the token has expired
    const clearLocalStorageOnTokenExpiry = () => {
      const token = localStorage.getItem("token");
      if (token) {
        // Parse the JWT token to get the expiration time
        const { exp } = JSON.parse(atob(token.split(".")[1]));

        // Check if the token has expired
        if (exp * 1000 < Date.now()) {
          // Token has expired, set the isTokenExpired state variable to true
          setIsTokenExpired(true);
          localStorage.clear();
        } else {
          // Token has not expired, set the isTokenExpired state variable to false
          setIsTokenExpired(false);
        }
      }
    };

    // Call the function when the component mounts to check for token expiration
    clearLocalStorageOnTokenExpiry();

    // You can also set up an interval to periodically check the token's expiration
    const tokenExpiryCheckInterval = setInterval(clearLocalStorageOnTokenExpiry, 10000); // Check every minute

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(tokenExpiryCheckInterval);
    };
  }, [location, currentPathName]);

  const handleOkExpire = () => {
    localStorage.clear();
    setIsTokenExpired(false);
  };

  if (isTokenExpired) {
    console.log("Token has expired");
    return (
      <Alert variant="destructive">
        <BsExclamationTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Your session has expired. Please log in again.</AlertDescription>
        <Button className="ml-auto" onClick={handleOkExpire}>
          OK
        </Button>
      </Alert>
    );
  }

  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route path="/" element={<Homepage />} />
        <Route path="about" element={<About />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
      <Route path="email-verification" element={<EmailChecker />} />
      <Route path="emergency-link" element={<EmergencyLink />} />
      <Route element={<CounselorLayout />}>
        <Route path="home" element={<PrivateRoute userType="Counselor" component={Home} />} />
        <Route path="dashboard" element={<PrivateRoute userType="Counselor" component={Dashboard} />} />
        <Route path="students-list" element={<PrivateRoute userType="Counselor" component={Students} />} />
        <Route path="calendar" element={<PrivateRoute userType="Counselor" component={Calendarpage} />} />
        <Route path="my-notes" element={<PrivateRoute userType="Counselor" component={Notes} />} />
      </Route>
      <Route element={<TeacherLayout />}>
        <Route path="student-referral" element={<PrivateRoute userType="Teacher" component={StudentReferral} />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
      npm install react@latest
    </Routes>
  );
}
