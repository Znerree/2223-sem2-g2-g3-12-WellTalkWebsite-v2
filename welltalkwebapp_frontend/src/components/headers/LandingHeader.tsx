import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import Logo from "@/components/headers/logo";
import homebg from "@/assets/images/homebg.png";

export const bgStyle = {
  backgroundImage: `url(${homebg})`,
  backgroundSize: "50%",
  backgroundPosition: "bottom right",
  backgroundRepeat: "no-repeat",
};

const LandingHeader = () => {
  const location = useLocation();
  const [active, setActive] = useState(0);

  let heroNavs = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
  ];

  useEffect(() => {
    const activeIndex = heroNavs.findIndex((nav) => nav.path === location.pathname);
    setActive(activeIndex);
  }, [active]);

  return (
    <>
      <header className=" flex justify-between px-6 items-center py-2 sticky top-0">
        <Logo />

        <div className=" gap-3 flex">
          {heroNavs.map((nav, index) => (
            <Button
              asChild
              variant={"link"}
              key={index}
              className={`${active === index ? "text-primary-700 hover:no-underline" : "text-gray-400 hover:no-underline hover:text-primary-600"}`}
              onClick={() => {
                setActive(index);
              }}
            >
              <Link to={nav.path}>{nav.name}</Link>
            </Button>
          ))}

          <Button asChild variant="outline" className=" hover:bg-primary-200 hover:bg-opacity-50">
            <Link to="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link to="/register">Register</Link>
          </Button>
        </div>
      </header>
    </>
  );
};

export default LandingHeader;
