import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const routeToTitle: { [key: string]: string } = {
  "/": " ",
  "/about": " ",
  "/login": " Login",
  "/register": " Create an Account",
  "/home": " Home",
  "/dashboard": " Dashboard",
  "/students": "Students",
  "/calendar": " Calendar",
  "/notes": " Notes",
  "/email-verification": " Email Verification",
  "/student-referral": " Student Referral",
  "/emergency-link": " Emergency Contact Numbers",
};

const useGetCurrentPath = () => {
  const [currentPathName, setCurrentPathName] = useState("");
  const location = useLocation();

  useEffect(() => {
    // Get the current route from the location
    const currentRoute = location.pathname;

    // Set the document title based on the current route
    document.title = ` ${routeToTitle[currentRoute] || "Page Not Found"}`;

    if (routeToTitle[currentRoute] === " ") {
      document.title = "WellTalk";
    }

    if (currentRoute === "/") {
      document.title = "WellTalk";
    }

    // Set the current path name state variable
    setCurrentPathName(routeToTitle[currentRoute] || "Page Not Found");
  }, [location]);

  return { currentPathName };
};

export default useGetCurrentPath;
