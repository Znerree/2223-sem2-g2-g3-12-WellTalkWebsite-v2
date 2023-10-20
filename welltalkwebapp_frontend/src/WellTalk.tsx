import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import About from "./pages/About";
import Calendar from "./pages/private-pages/Calendar";
import Register from "./pages/Register";
import Dashboard from "./pages/private-pages/Dashboard";
import Students from "./pages/private-pages/Students";
import Login from "./pages/Login";
import EmailChecker from "./pages/EmailChecker";
import { StudentReferral } from "./pages/private-pages/StudentReferral";
import Home from "./pages/private-pages/Home";
import Notes from "./pages/private-pages/Notes";
import Landing from "./pages/Landing";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { PrivateRoute } from "./PrivateRoutes";
import EmergencyLink from "./pages/EmergencyLink";
import axios from "./api/axios";
import SidebarNav from "./components/SidebarNav";
import CounselorHeader from "./components/CounselorHeader";
import LandingHeader from "./components/LandingHeader";
import ReferralHeader from "./components/ReferralHeader";
import CounselorLayout from "./components/Layout";
import { ProgressBar } from "./components/Loading";
import useLoading from "./hooks/useLoading";
import Layout from "./components/Layout";

const routeToTitle: { [key: string]: string } = {
  "/": " ",
  "/about": " ",
  "/login": "| Login",
  "/register": "| Create an Account",
  "/home": "| Home",
  "/dashboard": "| Dashboard",
  "/students": "| Students",
  "/calendar": "| Calendar",
  "/notes": "| Notes",
  "/email-verification": "| Email Verification",
  "/student-referral": "| Student Referral",
  "/emergency-link": "| Emergency Contact Numbers",
};

function WellTalk() {
  const location = useLocation();
  const [isTokenExpired, setIsTokenExpired] = useState(false);

  useEffect(() => {
    // Get the current route from the location
    const currentRoute = location.pathname;

    // Set the document title based on the current route
    document.title = `WellTalk  ${routeToTitle[currentRoute] || "Page Not Found"}`;
  }, [location]);

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
          // localStorage.removeItem("token");
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
  }, []);

  const navigate = useNavigate();
  const { loading } = useLoading();

  const handleExtend = async () => {
    const username = localStorage.getItem("user");
    const password = localStorage.getItem("password");
    const userType = localStorage.getItem("userType");

    try {
      const response = await axios.post(
        "/authenticate",
        { username, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.setItem("token", response.data.token);
      if (userType === "Counselor") {
        navigate("/home");
      } else {
        navigate("/student-referral");
      }
    } catch (error) {
      return { success: false, error };
    } finally {
      setIsTokenExpired(false);
    }
  };

  const handleCancelExtend = () => {
    localStorage.clear();
    setIsTokenExpired(false);
  };

  return (
    <>
      <AuthProvider>
        <Layout>
          {/* Routes */}
          <Routes>
            {/* public routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/email-verification" element={<EmailChecker />} />

            <Route path="/emergency-link" element={<EmergencyLink />} />

            {/* private routes */}
            <Route path="/home" element={<PrivateRoute userType="Counselor" component={Home} />} />
            <Route path="/dashboard" element={<PrivateRoute userType="Counselor" component={Dashboard} />} />
            <Route path="/students" element={<PrivateRoute userType="Counselor" component={Students} />} />
            <Route path="/calendar" element={<PrivateRoute userType="Counselor" component={Calendar} />} />
            <Route path="/notes" element={<PrivateRoute userType="Counselor" component={Notes} />} />

            <Route path="/student-referral" element={<PrivateRoute userType="Teacher" component={StudentReferral} />} />

            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Layout>

        {/* Show the token expired message if the token has expired */}
        {isTokenExpired && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg">
              <h1 className="text-2xl font-bold text-red-500">Your session has expired.</h1>
              <p className="text-gray-600">Please login again to continue.</p>
              <div className=" flex mt-5 gap-2">
                <button className=" bg-tertiary text-white py-1 px-3 rounded-sm" onClick={handleExtend}>
                  Extend session
                </button>
                <button className=" bg-gray-500 text-white py-1 px-3 rounded-sm" onClick={handleCancelExtend}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </AuthProvider>
    </>
  );
}

function PageNotFound() {
  return <h1>Page not found</h1>;
}

export default WellTalk;
