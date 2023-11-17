import pageBackground from "@/assets/images/login-registerbg.png";
import { Link } from "react-router-dom";
import useLoading from "@/hooks/useLoading";
import { LoadingScreen } from "@/components/Loaders";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import LoginForm from "@/components/authentication/login-form";
import { Label } from "@/components/ui/label";

const pageBg = {
  backgroundImage: `url(${pageBackground})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
};

const Login = () => {
  const { loading } = useLoading();

  return (
    <>
      <div className="flex flex-col h-screen w-full justify-center items-center" style={pageBg}>
        <Card className=" w-96">
          <CardHeader>
            <CardTitle className=" text-primary-500 mx-auto">Log in</CardTitle>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
          <CardFooter className="flex justify-center">
            <Label className=" text-sm text-gray-300">
              Don't have an account?{" "}
              <Link to="/register" className=" text-primary-500 hover:underline">
                Create an account
              </Link>
            </Label>
          </CardFooter>
        </Card>
        {loading && <LoadingScreen />}
      </div>
    </>
  );
};

export default Login;
