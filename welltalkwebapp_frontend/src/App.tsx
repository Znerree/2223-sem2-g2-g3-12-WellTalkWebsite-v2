import { Routes, Route, useLocation } from "react-router-dom";
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

  return (
    <>
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

        <Route path="student-referral" element={<PrivateRoute userType="Teacher" component={StudentReferral} />} />

        <Route path="*" element={<PageNotFound />} />
        {/* Show the token expired message if the token has expired */}
        {isTokenExpired && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg">
              <h1 className="text-2xl font-bold text-red-500">Your session has ended.</h1>
              <p className="text-gray-600">Please login again to continue.</p>
              <div className=" flex mt-5 gap-2">
                <button className=" bg-gray-500 text-white py-1 px-3 rounded-sm" onClick={handleOkExpire}>
                  Ok
                </button>
              </div>
            </div>
          </div>
        )}
      </Routes>
    </>
  );
}
