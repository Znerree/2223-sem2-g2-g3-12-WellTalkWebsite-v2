import { Link } from "react-router-dom";
import logo from "@/media/images/logo.png";
import { Button } from "../ui/button";
import { AiFillAlert, AiOutlineSearch } from "react-icons/ai";
import { Input } from "../ui/input";
import { CgMenuLeft } from "react-icons/cg";
import AvatarInitials from "../ui/avatar-initials";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

type LoggedInHeaderProps = {
  currentPathName: string;
  showSidebar?: () => void;
};

const LoggedInHeader = ({ currentPathName, showSidebar }: LoggedInHeaderProps) => {
  const { user, logout } = useAuth();
  const isCounselor = localStorage.getItem("userType") === "Counselor" ? true : false;

  const initials = user ? user?.firstName.charAt(0) + user?.lastName.charAt(0) : "";

  const handleLogout = () => {
    window.location.reload();
    logout();
  };

  return (
    <>
      <div className=" flex justify-between px-6 py-2 items-center shadow sticky top-0 bg-white">
        <div className=" flex items-center gap-2">
          {isCounselor && (
            <Button variant="ghost" size={"icon"} onClick={showSidebar} className=" text-primary-500 hover:text-primary-600">
              <CgMenuLeft size={20} />
            </Button>
          )}
          <p className=" text-neutral-700">{currentPathName}</p>
        </div>
        <div className=" flex items-center gap-2">
          <div className="relative">
            <Input type="search" placeholder="Search Welltalk" className="md:w-[100px] lg:w-[300px] bg-inherit pr-8 shadow-sm" />
            <AiOutlineSearch className="absolute top-1/2 right-2 transform -translate-y-1/2 h-5 w-5 cursor-pointer text-primary-500" />
          </div>
          {!isCounselor && (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <AvatarInitials name={`${initials}`} className=" h-8 w-8 outline outline-offset-2 outline-primary-200 " />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>
                  {user ? (
                    <p>
                      {user.firstName} {user.lastName}
                    </p>
                  ) : (
                    ""
                  )}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Link to="#">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
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
