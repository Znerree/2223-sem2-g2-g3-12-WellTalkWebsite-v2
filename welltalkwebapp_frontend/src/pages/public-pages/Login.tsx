import { Link, useNavigate } from "react-router-dom";
import useLoading from "@/hooks/useLoading";
import { LoadingScreen } from "@/components/Loaders";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import LoginForm from "@/components/authentication/LoginForm";
import { Toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";

const Login = () => {
  const { loading } = useLoading();

  return (
    <div className=" h-full flex">
      <Card className=" sm:w-[420px] mx-auto my-auto bg-opacity-95">
        <CardHeader>
          <CardTitle className=" text-primary-500">Log in</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm />
          <Button asChild variant={"link"} size={"sm"} className=" w-full flex justify-end">
            <Link to="/forgot-password" className=" text-xs">
              Forgot password?
            </Link>
          </Button>
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
      <Toaster />
      {loading && <LoadingScreen />}
    </div>
  );
};

export default Login;
