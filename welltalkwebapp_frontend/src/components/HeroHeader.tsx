import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import useFetchUser from "@/hooks/useFetchUser";
import Logo from "./Logo";
import homebg from "@/assets/images/homebg.png";

export const bgStyle = {
  backgroundImage: `url(${homebg})`,
  backgroundSize: "50%",
  backgroundPosition: "bottom right",
  backgroundRepeat: "no-repeat",
};

const HeroHeader = () => {
  const location = useLocation();
  const [active, setActive] = useState(0);

  let heroNavs = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
  ];

  useEffect(() => {
    const activeIndex = heroNavs.findIndex((nav) => nav.path === location.pathname);
    setActive(activeIndex);
  }, [location]);

  if (location.pathname !== "/" && location.pathname !== "/about") {
    return null;
  }

  const isLoggedin = localStorage.getItem("token");

  const { user } = useFetchUser();

  const userNameInitials = `${user?.firstName[0]}${user?.lastName[0]}`;

  return (
    <>
      <header className=" flex justify-between px-6 items-center sticky top-0">
        <span className=" flex items-center">
          <Logo />
        </span>

        <div className=" gap-3 flex">
          {heroNavs.map((nav, index) => (
            <Button
              asChild
              variant={"link"}
              key={index}
              className={`${
                active == index ? "text-primary hover:no-underline " : "text-gray-400 hover:no-underline hover:text-primary hover:text-opacity-70"
              }`}
              onClick={() => {
                setActive(index);
              }}
            >
              <Link to={nav.path}>{nav.name}</Link>
            </Button>
          ))}

          <Button
            asChild
            variant="outline"
            className=" text-primary bg-inherit border-primary hover:bg-primary font-bold hover:text-primary hover:bg-opacity-10"
          >
            <Link to="/login">Login</Link>
          </Button>
          <Button asChild className=" bg-primary hover:bg-primary hover:bg-opacity-70 font-bold">
            <Link to="/register">Register</Link>
          </Button>
        </div>
      </header>
    </>
  );
};

export default HeroHeader;
