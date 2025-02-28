'use client'
import ShopZenLogo from "@/components/shared/Logo/ShopZenLogo"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { registerValidationSchema } from "./registerValidation";
import { userRegister } from "@/services/AuthServices";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";
import { useUser } from "@/context/UserContext";

const RegisterForm = () => {
  const form = useForm({
    resolver: zodResolver(registerValidationSchema),
  });
  const {
    formState: { isSubmitting },
  } = form;
  const { setIsLoading } = useUser();
  // Form Value Watch
  const password = form.watch("password");
  const confirmPassword = form.watch("confirmPassword");

  // Register Form Handle
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      // Form Data Send to Server action
      const res = await userRegister(data);
      setIsLoading(true);
      // Toast Handle
      if (res?.success) {
        toast.success(res?.message);
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <div className="max-w-md w-full bg-white border p-7 md:p-10 rounded">
        <div className="flex gap-2 border-b pb-3 mb-6">
          <ShopZenLogo />
          <div className="space-y-1">
            <h2 className="font-bold text-lg md:text-2xl">ShopZen</h2>
            <p className="text-xs">
              Enter your email and phone number to sign up.
            </p>
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>

                  {confirmPassword && password !== confirmPassword ? (
                    <FormMessage>Password does not match</FormMessage>
                  ) : (
                    <FormMessage />
                  )}
                </FormItem>
              )}
            />
            <Button
              disabled={confirmPassword && password !== confirmPassword}
              type="submit"
              className="w-full mt-2"
            >
              {isSubmitting ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                "Register"
              )}
            </Button>
            <p className="mt-2 text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="font-bold hover:underline">
                Sign In
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default RegisterForm;
