import { Routes, Route, useLocation, BrowserRouter as Router } from "react-router-dom";
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
import TeacherLayout from "./components/layouts/TeacherLayout";
import { AuthProvider } from "./contexts/AuthContext";
import { Dialog, DialogDescription } from "./components/ui/dialog";
import { DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogTitle } from "./components/ui/alert-dialog";
import { Separator } from "./components/ui/separator";

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
      <AlertDialog open={isTokenExpired} onOpenChange={handleOkExpire}>
        <AlertDialogContent className=" bg-primary-100 bg-opacity-30">
          <AlertDialogTitle className=" text-lg flex items-center gap-2">
            <BsExclamationTriangle className="text-yellow-500 text-3xl" />
            Session Expired
          </AlertDialogTitle>
          <Separator />
          <AlertDialogDescription>Your session has expired. Please log in again to continue using WellTalk.</AlertDialogDescription>
          <Separator />
          <AlertDialogFooter className="flex justify-end">
            <Button className=" rounded-md" onClick={handleOkExpire}>
              Login Again
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  return (
    <AuthProvider>
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
      </Routes>
    </AuthProvider>
  );
}
