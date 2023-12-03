import { Link } from "react-router-dom";
import logo from "@/media/images/logo.png";
import { Button } from "@/components/ui/button";

const DefaultHeader = () => {
  return (
    <>
      <header>
        {/* big screen */}
        <div className=" flex items-center justify-between mx-14 py-4">
          <div className="hidden sm:block">
            <Link to="/">
              <img src={logo} alt="logo" className=" h-16 w-16" />
            </Link>
          </div>
          <div className=" space-x-3 md:flex-col items-center">
            <Button asChild variant={"link"} className=" hover:no-underline hover:text-primary-700">
              <Link to="/">Home</Link>
            </Button>
            <Button asChild variant={"link"} className=" hover:no-underline hover:text-primary-700">
              <Link to="/features">Features</Link>
            </Button>
            <Button asChild variant={"link"} className=" hover:no-underline hover:text-primary-700">
              <Link to="/about">About Us</Link>
            </Button>

            <Button variant={"outline"} className=" hover:bg-primary-200 hover:bg-opacity-30">
              <Link to="/login">Login</Link>
            </Button>
            <Button variant={"default"}>
              <Link to="/register">Create account</Link>
            </Button>
          </div>
        </div>
      </header>
    </>
  );
};

export default DefaultHeader;
