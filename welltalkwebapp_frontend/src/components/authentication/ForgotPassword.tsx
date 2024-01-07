import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link, Navigate, useNavigate } from "react-router-dom";
import * as z from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import axios from "@/api/axios";
import { Alert } from "../ui/alert";
import { is } from "date-fns/locale";

const forgotPasswordSchema = z
  .object({
    email: z.string().email({ message: "Invalid email address, please try again." }),
    otp: z.string().optional(),
    password: z.string().optional(),
    confirmPassword: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

const ForgotPassword = () => {
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);

  const navigate = useNavigate();

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
      otp: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onRequestOtp: SubmitHandler<ForgotPasswordFormValues> = async (data) => {
    try {
      const email = data.email;
      const response = await axios.get(`/users/${email}`, {
        validateStatus: (status) => status === 200 || status === 404,
      });

      if (response.status === 404) {
        setErrorMsg("Email not found. Please try again.");
        setSuccessMsg("");
      } else if (response.status === 200) {
        const res = await axios.post(`/send-otp?email=${data.email}`);
        setSuccessMsg(`We've sent an OTP to your email - ${data.email}`);
        setErrorMsg("");
        setOtpSent(true);
        console.log(res);
      } else {
        setErrorMsg("Unexpected response status. Please try again.");
        setSuccessMsg("");
      }
    } catch (err) {
      setErrorMsg("Something went wrong. Please try again.");
      setSuccessMsg("");
      console.log(err);
    }
  };

  const onVerifyOtp: SubmitHandler<ForgotPasswordFormValues> = async (data) => {
    try {
      const email = data.email;
      const enteredOtp = data.otp;

      const response = await axios.post(`/verify-otp?email=${email}&enteredOtp=${enteredOtp}`, null, {
        validateStatus: (status) => status === 200 || status === 401,
      });

      console.log(response);

      if (response.status === 200) {
        setSuccessMsg("OTP verified successfully.");
        setErrorMsg("");
        setOtpVerified(true);
      } else if (response.status === 401) {
        setErrorMsg("OTP verification failed. Please try again.");
        setSuccessMsg("");
      }
    } catch (err) {
      setErrorMsg("Something went wrong. Please try again.");
      setSuccessMsg("");
      console.error(err);
    }
  };

  const handleResendOtp = async () => {
    try {
      const email = form.getValues("email");
      const res = await axios.post(`/send-otp?email=${email}`);
      setSuccessMsg(`We've sent an OTP to your email - ${email}`);
      setErrorMsg("");
      setOtpSent(true);
      console.log(res);
    } catch (err) {
      setErrorMsg("Something went wrong. Please try again.");
      setSuccessMsg("");
      console.log(err);
    }
  };

  const onPasswordChange: SubmitHandler<ForgotPasswordFormValues> = async (data) => {
    try {
      const email = data.email;
      const currentUser = await axios.get(`/users/${email}`);
      const userid = currentUser.data.id;
      const user = {
        password: data.password,
        confirmPassword: data.confirmPassword,
      };
      if (user.password !== user.confirmPassword) {
        setErrorMsg("Passwords do not match. Please try again.");
        setSuccessMsg("");
        return;
      } else {
        const res = await axios.put(`/reset-password/users/${userid}`, user);
        console.log(res);
        setErrorMsg("");
        setSuccessMsg("Password changed successfully. Redirecting to login page...");
        setTimeout(() => {
          navigate("/login");
        }, 3000);
        setIsPasswordChanged(true);
      }
    } catch (err) {
      setErrorMsg("Something went wrong. Please try again.");
      setSuccessMsg("");
      console.log(err);
    }
  };

  return (
    <div className=" h-full flex">
      <Card className=" sm:w-[420px] my-auto mx-auto bg-opacity-95">
        <CardHeader>
          <CardTitle className=" text-primary-500">{otpVerified ? "Change" : "Forgot"} password</CardTitle>
          <CardDescription className=" text-sm text-gray-400">
            {!otpVerified ? "Enter your email to send an OTP to reset your password." : "Enter your new password"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              className=" space-y-5"
              onSubmit={otpVerified ? form.handleSubmit(onPasswordChange) : otpSent ? form.handleSubmit(onVerifyOtp) : form.handleSubmit(onRequestOtp)}
            >
              {successMsg && (
                <Alert variant="success" className=" text-xs flex">
                  {successMsg}
                </Alert>
              )}
              {errorMsg && (
                <Alert variant="destructive" className=" text-xs">
                  {errorMsg}
                </Alert>
              )}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="email" placeholder="Email" {...field} disabled={form.formState.isSubmitting || otpSent} />
                    </FormControl>
                    <FormMessage className=" text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter OTP"
                        {...field}
                        disabled={form.formState.isSubmitting || !otpSent}
                        className={`${!otpSent || otpVerified ? "hidden" : ""}`}
                      />
                    </FormControl>
                    <FormMessage className=" text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter new password"
                        autoComplete="off"
                        {...field}
                        disabled={form.formState.isSubmitting || !otpVerified || isPasswordChanged}
                        className={`${!otpVerified ? "hidden" : ""}`}
                      />
                    </FormControl>
                    <FormMessage className=" text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirm new password"
                        autoComplete="off"
                        {...field}
                        disabled={form.formState.isSubmitting || !otpVerified || isPasswordChanged}
                        className={`${!otpVerified ? "hidden" : ""}`}
                      />
                    </FormControl>
                    <FormMessage className=" text-xs" />
                  </FormItem>
                )}
              />

              <Button type="submit" className=" w-full" disabled={form.formState.isSubmitting || !form.formState.isValid || isPasswordChanged}>
                {!otpSent ? "Send OTP" : otpVerified ? "Change password" : "Verify OTP"}
              </Button>
              <p className=" text-sm w-full flex gap-1 justify-center text-slate-400">
                {!otpSent && (
                  <>
                    <span>Return to </span>
                    <Link to="/login" className=" text-primary-600 font-semibold hover:underline">
                      {" "}
                      Login
                    </Link>
                  </>
                )}
              </p>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPassword;
