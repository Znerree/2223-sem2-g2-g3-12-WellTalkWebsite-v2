import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Alert, AlertDescription } from "../ui/alert";
import { loginSchema } from "@/schema-zod/loginSchema";

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const [errMsg, setErrMsg] = useState<string | { message: string }>("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    setLoading(true);
    try {
      const { success, userType, error } = await login(data.username, data.password);

      if (success) {
        if (userType === "Counselor") {
          navigate("/home");
        } else {
          navigate("/student-referral");
        }
      } else {
        if (error.message === "Network Error") {
          setErrMsg("No connection to the server");
        } else {
          setErrMsg("Invalid username or password");
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-5 ">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="Username" type="text" />
                </FormControl>
                {form.formState.errors.username && <FormMessage>{form.formState.errors.username.message}</FormMessage>}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="password" {...field} placeholder="Password" />
                </FormControl>
                {form.formState.errors.password && <FormMessage>{form.formState.errors.password.message}</FormMessage>}
              </FormItem>
            )}
          />
          <span>
            <Link to="#" className=" text-primary-500 text-sm justify-end flex hover:underline">
              Forgot Password?
            </Link>
          </span>
          <Alert variant="destructive" className={`${errMsg ? "" : "hidden"}`}>
            <AlertDescription>{typeof errMsg === "string" ? errMsg : errMsg.message}</AlertDescription>
          </Alert>
          <Button type="submit" className=" w-full" disabled={loading}>
            {loading ? "Logging in..." : "Log in"}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default LoginForm;
