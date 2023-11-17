import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { Alert, AlertDescription } from "../ui/alert";
import { registerSchema } from "@/schema-zod/registerSchema";

type RegisterFormValues = z.infer<typeof registerSchema>;

const RegisterForm = () => {
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; isError: boolean }>();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      schoolID: "",
      userType: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<RegisterFormValues> = async (data) => {
    setLoading(true);
    const schoolID = Number(data.schoolID.replace(/-/g, ""));
    const { success, error } = await register(data.firstName, data.lastName, data.email, schoolID, data.userType, data.username, data.password);
    if (!success) {
      setMessage({ text: "Something went wrong.", isError: true });
    } else {
      setMessage({ text: "Account created successfully", isError: false });
      form.reset();
    }
    setLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-5">
        <span className=" flex space-x-2">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="Firstname" type="text" />
                </FormControl>
                {form.formState.errors.firstName && <FormMessage>{form.formState.errors.firstName.message}</FormMessage>}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="Lastname" type="text" />
                </FormControl>
                {form.formState.errors.lastName && <FormMessage>{form.formState.errors.lastName.message}</FormMessage>}
              </FormItem>
            )}
          />
        </span>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} placeholder="Email" type="email" />
              </FormControl>
              {form.formState.errors.email && <FormMessage>{form.formState.errors.email.message}</FormMessage>}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="schoolID"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} placeholder="ID number (example format: 12-3456-789)" />
              </FormControl>
              {form.formState.errors.schoolID && <FormMessage>{form.formState.errors.schoolID.message}</FormMessage>}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="userType"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Please select a user type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Counselor">Counselor</SelectItem>
                    <SelectItem value="Teacher">Teacher</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              {form.formState.errors.userType && <FormMessage>{form.formState.errors.userType.message}</FormMessage>}
            </FormItem>
          )}
        />
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
                <Input {...field} placeholder="Password" type="password" />
              </FormControl>
              {form.formState.errors.password && <FormMessage>{form.formState.errors.password.message}</FormMessage>}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} placeholder="Confirm Password" type="password" />
              </FormControl>
              {form.formState.errors.confirmPassword && <FormMessage>{form.formState.errors.confirmPassword.message}</FormMessage>}
            </FormItem>
          )}
        />

        {message && (
          <Alert className={`${message.text ? (message.isError ? "bg-red-100" : "bg-green-100") : "hidden"}`}>
            <AlertDescription>{message.text}</AlertDescription>
          </Alert>
        )}

        <Button type="submit" className=" w-full" disabled={loading}>
          {loading ? "Creating account..." : "Register"}
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
