"use client";
import ShopZenLogo from "@/components/shared/Logo/ShopZenLogo";
import { Button } from "@/components/ui/button";
// import ReCAPTCHA from "react-google-recaptcha";

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
import { userLogin } from "@/services/AuthServices";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";
import { loginValidationSchema } from "./loginValidation";
// import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const LoginForm = () => {
  const form = useForm({
    resolver: zodResolver(loginValidationSchema),
  });
  // const [reCaptchaStatus, setReCaptchaStatus] = useState(false);
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirectPath");
  const router = useRouter();
  const {
    formState: { isSubmitting },
  } = form;

  // Register Form Handle
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      // Form Data Send to Server action
      const res = await userLogin(data);
      // Toast Handle
      if (res?.success) {
        toast.success(res?.message);
        if (redirect) {
          router.push(redirect);
        } else {
          router.push("/profile");
        }
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Handle RecapCha
  // const handleRecapCha = async (value: string | null) => {
  //   try {
  //     const res = await googleRecaptchaVerify(value!);
  //     console.log(res);
  //     if (res?.success) {
  //       setReCaptchaStatus(true);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <div className="max-w-md w-full bg-white border p-7 md:p-10 rounded">
        <div className="flex gap-2 border-b pb-3 mb-6">
          <ShopZenLogo />
          <div className="space-y-1">
            <h2 className="font-bold text-lg md:text-2xl">ShopZen</h2>
            <p className="text-xs">Welcome Back!</p>
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
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
            {/* <div className="flex justify-center mt-4 w-full">
              <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_RECAPCHA_CLIENT_KEY!}
                onChange={handleRecapCha}
              />
            </div> */}
            <Button
              // disabled={reCaptchaStatus ? false : true}
              type="submit"
              className="w-full mt-2"
            >
              {isSubmitting ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                "Login"
              )}
            </Button>
            <p className="mt-2 text-center text-sm">
              Do not have any account?{" "}
              <Link href="/register" className="font-bold hover:underline">
                Register
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
