import { Link } from "react-router-dom";
import logo from "@/media/images/logo.png";
import { Button } from "../ui/button";
import { AiFillAlert, AiOutlineSearch } from "react-icons/ai";
import { Input } from "../ui/input";
import { CgMenuLeft } from "react-icons/cg";

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
          <Button variant="ghost" size={"icon"} onClick={handleShowSidebar} className=" text-primary-500 hover:text-primary-600">
            <CgMenuLeft size={20} />
          </Button>
          <p className=" text-neutral-700">{currentPathName}</p>
        </div>
        <div className=" flex items-center gap-2">
          <div className="relative">
            <Input type="search" placeholder="Search Welltalk" className="md:w-[100px] lg:w-[300px] bg-inherit pr-8 shadow-sm" />
            <AiOutlineSearch className="absolute top-1/2 right-2 transform -translate-y-1/2 h-5 w-5 cursor-pointer text-primary-500" />
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
