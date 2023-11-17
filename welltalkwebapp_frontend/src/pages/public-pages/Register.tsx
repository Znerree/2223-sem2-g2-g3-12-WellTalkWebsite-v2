import pageBackground from "@/assets/images/login-registerbg.png";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import RegisterForm from "@/components/authentication/register-form";
import { Label } from "@/components/ui/label";

const pageBg = {
  backgroundImage: `url(${pageBackground})`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
};

const Register = () => {
  return (
    <>
      <div className="flex flex-col h-screen w-full justify-center items-center" style={pageBg}>
        <Card className=" w-96">
          <CardHeader>
            <CardTitle className=" text-primary-500 mx-auto">Register</CardTitle>
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
