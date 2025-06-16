"use client";

import { useState, useEffect, Suspense } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { toast } from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import {
  verifyEmailSchema,
  type VerifyEmailSchema,
} from "@/components/ui/validation/auth";
import { useAuthStore } from "@/state/auth-store";
import { PageContainer } from "@/components/ui/page-container";
import { OtpInput } from "@/components/ui/auth/otp-input";

interface CustomError {
  response: {
    data: {
      message: string;
    };
  };
}

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const { isLoading } = useAuthStore();

  // Get token from URL if available
  const tokenFromUrl = searchParams?.get("token") || "";

  // State for OTP digits
  const [otpDigits, setOtpDigits] = useState<string[]>(
    tokenFromUrl ? tokenFromUrl.split("").slice(0, 4) : Array(4).fill("")
  );

  const form = useForm<VerifyEmailSchema>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: {
      token: tokenFromUrl,
    },
  });

  // Update form value when OTP digits change
  useEffect(() => {
    const combinedToken = otpDigits.join("");
    form.setValue("token", combinedToken);

    // Submit automatically if all 4 digits are filled
    if (combinedToken.length === 4 && !otpDigits.includes("")) {
      form.handleSubmit(onSubmit)();
    }
  }, [otpDigits, form]);

  // If token is in URL, submit automatically
  useEffect(() => {
    if (tokenFromUrl) {
      form.setValue("token", tokenFromUrl);
      form.handleSubmit(onSubmit)();
    }
  }, [tokenFromUrl, form]);

  async function onSubmit() {
    try {
      // await verifyEmail(values.token);
      setTimeout(() => {
        toast.success("Email verified successfully! You can now log in.");
        // router.push("/auth/login");
      }, 1000);
    } catch (error: unknown) {
      // TODO: handle error
      const axiosError = error as CustomError;
      toast.error(
        axiosError.response?.data?.message || "Failed to verify email"
      );
    }
  }

  return (
    <PageContainer
      maxWidth="full"
      className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900"
    >
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="p-8 sm:p-12">
            <div className="w-full mx-auto space-y-6">
              <div className="flex justify-center">
                <div className="rounded-full bg-primary/10 p-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-12 w-12 text-primary"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
              </div>

              <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold">Verify your email</h1>
                <p className="text-muted-foreground">
                  {tokenFromUrl
                    ? "We are verifying your email address..."
                    : "Enter the verification code sent to your email"}
                </p>
              </div>

              {!tokenFromUrl && (
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <FormField
                      control={form.control}
                      name="token"
                      render={() => (
                        <FormItem>
                          <div className="space-y-4">
                            <OtpInput
                              value={otpDigits}
                              onChange={setOtpDigits}
                              className="py-4"
                            />
                            <p className="text-center text-sm text-muted-foreground">
                              Enter the 4-digit code sent to your email
                            </p>
                          </div>
                          <FormMessage className="text-center mt-2" />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={
                        isLoading ||
                        otpDigits.includes("") ||
                        otpDigits.length < 4
                      }
                    >
                      {isLoading ? "Verifying..." : "Verify Email"}
                    </Button>
                  </form>
                </Form>
              )}

              {isLoading && (
                <div className="flex justify-center py-4">
                  <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
                </div>
              )}

              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Don&apos;t receive the code?{" "}
                  <Link href="#" className="text-primary hover:underline">
                    Resend verification email
                  </Link>
                </p>
              </div>

              <div className="text-center">
                <Link
                  href="/auth/login"
                  className="text-sm text-primary hover:underline"
                >
                  Back to login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<VerifyEmailFallback />}>
      <VerifyEmailContent />
    </Suspense>
  );
}

function VerifyEmailFallback() {
  return (
    <PageContainer
      maxWidth="full"
      className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900"
    >
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="p-8 sm:p-12">
            <div className="w-full mx-auto space-y-6">
              <div className="flex justify-center">
                <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
              </div>
              <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold">Verify your email</h1>
                <p className="text-muted-foreground">Loading verification page...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
