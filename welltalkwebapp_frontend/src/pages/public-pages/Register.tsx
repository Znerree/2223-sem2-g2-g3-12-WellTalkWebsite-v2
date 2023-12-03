import pageBackground from "@/media/images/login-registerbg.png";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import RegisterForm from "@/components/authentication/register-form";
import { Label } from "@/components/ui/label";
import logo from "@/media/images/logo.png";

const pageBg = {
  backgroundImage: `url(${pageBackground})`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
};

const Register = () => {
  return (
    <>
      <div className="flex flex-col h-screen w-full justify-center items-center" style={pageBg}>
        <div className=" my-3 flex flex-col items-center">
          <Link to="/">
            <img src={logo} alt="" className=" h-16 w-16 shrink-0" />
          </Link>
        </div>
        <Card className=" w-96">
          <CardHeader>
            <CardTitle className=" text-primary-700 ">Create an account</CardTitle>
          </CardHeader>
          <CardContent>
            <RegisterForm />
          </CardContent>
          <CardFooter className="flex justify-center">
            <Label className=" text-sm text-gray-300">
              Already have an account?{" "}
              <Link to="/login" className=" text-primary-500 hover:underline">
                Login
              </Link>
            </Label>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default Register;
