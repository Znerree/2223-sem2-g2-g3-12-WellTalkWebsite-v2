import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
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
import { AuthProvider } from "./contexts/AuthContext";
import { PrivateRoute } from "./PrivateRoutes";

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
};

function WellTalk() {
  const location = useLocation();

  useEffect(() => {
    // Get the current route from the location
    const currentRoute = location.pathname;

    // Set the document title based on the current route
    document.title = `WellTalk  ${routeToTitle[currentRoute] || "Page Not Found"}`;
  }, [location]);

  return (
    <AuthProvider>
      <Routes>
        {/* public routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/email-verification" element={<EmailChecker />} />

        {/* private routes */}
        <Route path="/home" element={<PrivateRoute userType="Counselor" component={Home} />} />
        <Route path="/dashboard" element={<PrivateRoute userType="Counselor" component={Dashboard} />} />
        <Route path="/students" element={<PrivateRoute userType="Counselor" component={Students} />} />
        <Route path="/calendar" element={<PrivateRoute userType="Counselor" component={Calendar} />} />
        <Route path="/notes" element={<PrivateRoute userType="Counselor" component={Notes} />} />
        <Route path="/student-referral" element={<PrivateRoute userType="Teacher" component={StudentReferral} />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </AuthProvider>
  );
}

function PageNotFound() {
  return <h1>Page not found</h1>;
}

export default WellTalk;
