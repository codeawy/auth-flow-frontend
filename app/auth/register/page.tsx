"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PageContainer } from "@/components/ui/page-container";
import {
  registerSchema,
  RegisterSchema,
} from "@/components/ui/validation/auth";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "@/state/auth-store";
import { SocialButton } from "@/components/ui/auth/social-button";
import { SocialProvider } from "@/types/auth";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";

const RegisterPage = () => {
  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      agreeToTerms: false,
    },
  });

  const { register, isLoading, error } = useAuthStore((state) => state);
  console.log(error);

  const handleSocialLogin = (provider: SocialProvider) => {
    console.log(provider);
  };

  const onSubmit = async (data: RegisterSchema) => {
    try {
      await register(data);
    } catch (error) {
      console.error(error);
    }
  };

  // if (error) {
  //   return <h3>{error}</h3>;
  // }

  return (
    <PageContainer
      maxWidth="full"
      className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900"
    >
      {typeof error === "string" && (
        <Alert variant="destructive" className="w-1/2 mx-auto my-5">
          <AlertCircleIcon />
          <AlertTitle>Unable to process your registration.</AlertTitle>
          <AlertDescription>
            <p>{error}</p>
          </AlertDescription>
        </Alert>
      )}
      {Array.isArray(error) && error.length > 0 && (
        <Alert variant="destructive" className="w-1/2 mx-auto my-5">
          <AlertCircleIcon />
          <AlertTitle>Unable to process your registration.</AlertTitle>
          <AlertDescription>
            <p>Please fix the following errors:</p>
            <ul className="list-inside list-disc text-sm">
              {error.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}
      <div className="w-full max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center rounded-xl overflow-hidden shadow-2xl bg-white dark:bg-gray-800">
        {/* Left side - illustration */}
        <div className="hidden md:block relative h-full min-h-[700px] bg-primary">
          <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-foreground/20 flex flex-col justify-between p-12 text-white">
            <div className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-8 w-8"
              >
                <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
              </svg>
              <span className="text-2xl font-bold">Auth Flow</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-3xl font-bold">Join our community!</h1>
              <p className="text-white/80">
                Create an account to access all features of our platform
              </p>
              <div className="pt-4">
                <div className="flex flex-col space-y-3">
                  {[
                    "Secure authentication",
                    "Email verification",
                    "Password recovery",
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center space-x-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5 text-white"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - form */}
        <div className="p-8 md:p-12">
          <div className="w-full max-w-md mx-auto space-y-8">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold">Create an account</h1>
              <p className="text-muted-foreground">
                Enter your information to get started
              </p>
            </div>

            <div className="space-y-4">
              <SocialButton
                provider="GOOGLE"
                buttonTitle="google"
                onClick={() => handleSocialLogin("GOOGLE")}
              />
              <SocialButton
                provider="GITHUB"
                buttonTitle="gitHub"
                onClick={() => handleSocialLogin("GITHUB")}
              />
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="name@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First name</FormLabel>
                        <FormControl>
                          <Input placeholder="John" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last name</FormLabel>
                        <FormControl>
                          <Input placeholder="Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="••••••••"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="agreeToTerms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="cursor-pointer">
                          I agree to the terms and conditions
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full mt-2"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating account..." : "Create account"}
                </Button>
              </form>
            </Form>

            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default RegisterPage;
