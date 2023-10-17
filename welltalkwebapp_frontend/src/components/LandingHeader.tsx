import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/images/logo.png";

const LandingHeader = () => {
  let navs = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
  ];

  const location = useLocation();
  const [active, setActive] = useState(0);

  useEffect(() => {
    const activeIndex = navs.findIndex((nav) => nav.path === location.pathname);
    setActive(activeIndex);
  }, [location]);

  return (
    <>
      <nav className=" flex items-center top-0 py-4 sticky justify-between px-4 bg-primary bg-opacity-20">
        <h1>{""}</h1>
        <ul className=" text-sm font-medium flex items-center text-secondary gap-4">
          {navs.map((nav, index) => (
            <Link
              key={index}
              className={active == index ? " mx-3 text-primary hover:text-primary" : " mx-3 hover:text-primary"}
              to={nav.path}
              onClick={() => {
                setActive(index);
              }}
            >
              {nav.name}
            </Link>
          ))}
          <Link to="/login" className=" text-center w-16 h-10 border border-primary text-primary rounded-md p-2 hover:shadow-primary hover:shadow">
            Login
          </Link>
          <Link to="/register" className="  bg-primary text-white rounded-md p-2 h-10 w-20 text-center hover:shadow-primary hover:shadow">
            Register
          </Link>
        </ul>
      </nav>
    </>
  );
};

export default LandingHeader;
