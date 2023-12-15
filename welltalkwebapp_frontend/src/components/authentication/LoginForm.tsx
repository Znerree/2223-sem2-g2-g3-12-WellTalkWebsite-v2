import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginSchema } from "@/schema-zod/loginSchema";
import { toast } from "../ui/use-toast";
import { useEffect } from "react";
import { ToastAction } from "../ui/toast";

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const [errMsg, setErrMsg] = useState(false);
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
        toast({
          variant: "success",
          title: "Success",
          description: "Login success. Redirecting...",
          duration: 1500,
        });
        const redirectTimeout = setTimeout(() => {
          navigate(userType === "Counselor" ? "/home" : "/student-referral");
        }, 2000);
        form.reset();
        return () => clearTimeout(redirectTimeout);
      } else {
        if (error.message === "Network Error") {
          setErrMsg(true);
          toast({
            variant: "destructive",
            title: "Error",
            description: "No connection to the server",
            duration: 2000,
          });
        } else {
          setErrMsg(true);
          toast({
            variant: "destructive",
            title: "Login failed",
            description: "Invalid username or password. Please try again.",
            duration: 2000,
          });
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
                  <Input {...field} autoComplete="on" placeholder="Username" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="password" {...field} autoComplete="off" placeholder="Password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className=" w-full" disabled={loading}>
            {loading ? "Logging in..." : "Log in"}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default LoginForm;
