import { Link } from "react-router-dom";
import useLoading from "@/hooks/useLoading";
import { LoadingScreen } from "@/components/Loaders";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import LoginForm from "@/components/authentication/login-form";
import logo from "@/media/images/logo.png";
import { Toaster } from "@/components/ui/toaster";

const Login = () => {
  const { loading } = useLoading();

  return (
    <div className="flex flex-col h-screen w-full justify-center items-center bg-primary-100 backdrop-blur-lg">
      <div className=" my-3 flex flex-col items-center">
        <Link to="/">
          <img src={logo} alt="" className=" h-16 w-16 shrink-0" />
        </Link>
      </div>
      <Card className=" sm:w-96 border bg-opacity-80">
        <CardHeader>
          <CardTitle className=" text-primary-700">Log in</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm />
          <Link to="/" className=" text-primary-500 hover:underline hover:underline-offset-2 text-xs flex justify-end">
            Forgot password?
          </Link>
        </CardContent>
        <CardFooter className="flex justify-center">
          <div className=" text-sm space-x-1">
            <span className=" text-gray-300"> Don't have an account?</span>
            <Link to="/register" className=" text-primary-500 hover:underline hover:underline-offset-2 font-semibold">
              Create an account
            </Link>
          </div>
        </CardFooter>
      </Card>
      {loading && <LoadingScreen />}
      <Toaster />
    </div>
  );
};

export default Login;
