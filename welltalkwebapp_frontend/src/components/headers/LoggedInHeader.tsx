import { Link } from "react-router-dom";
import logo from "@/assets/images/logo.png";
import { Button } from "../ui/button";
import { AiFillAlert, AiOutlineSearch } from "react-icons/ai";
import { Input } from "../ui/input";
import { GiHamburgerMenu } from "react-icons/gi";

type LoggedInHeaderProps = {
  currentPathName: string;
  showSidebar: () => void;
};

const LoggedInHeader = ({ currentPathName, showSidebar }: LoggedInHeaderProps) => {
  const handleShowSidebar = () => {
    showSidebar();
  };

  return (
    <>
      <div className=" flex justify-between px-6 py-2 items-center shadow bg-white">
        <div className=" flex items-center gap-2">
          <div className=" md:hidden">
            <Button variant="ghost" size={"icon"} onClick={handleShowSidebar}>
              <GiHamburgerMenu className="h-6 w-6" />
            </Button>
          </div>
          <img src={logo} alt="Welltalk logo" className="w-12 h-12 cursor-pointer" />
          <p className=" text-tertiary max-md:hidden text-lg font-semibold">{currentPathName}</p>
        </div>
        <div className=" flex items-center gap-2">
          <div className="relative">
            <Input type="search" placeholder="Search Welltalk" className="md:w-[100px] lg:w-[300px] pr-8 shadow-sm" />
            <AiOutlineSearch className="absolute top-1/2 right-2 transform -translate-y-1/2 h-5 w-5 cursor-pointer text-secondary" />
          </div>
          <Button variant="ghost" asChild size={"icon"} className=" text-red-500 hover:text-red-600">
            <Link to="/emergency-link">
              <AiFillAlert className="h-6 w-6" />
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default LoggedInHeader;
