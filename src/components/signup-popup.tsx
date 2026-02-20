import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Mail, User, Lock, Eye, EyeOff, X, Phone } from "lucide-react";
import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { CustomInput } from "./ui/custom-input";
import { useState, useEffect } from "react";

const formSchema = z
  .object({
    firstName: z
      .string({ message: "Full name is required" })
      .min(1, "Full name is required")
      .min(5, "Full name must be at least 5 characters.")
      .max(120, "Full name must be at most 120 characters."),

    lastName: z
      .string({ message: "Full name is required" })
      .min(1, "Full name is required")
      .min(5, "Full name must be at least 5 characters.")
      .max(120, "Full name must be at most 120 characters."),

    phoneNumber: z
      .string({ message: "Phone number is required" })
      .min(1, "Phone number is required")
      .min(5, "Phone number must be at least 5 characters.")
      .max(20, "Phone number must be at most 20 characters."),

    emailAddress: z
      .string({ message: "Email address is required" })
      .min(1, "Email address is required")
      .email("Invalid email address.")
      .max(50, "Email must be at most 50 characters."),

    password: z
      .string({ message: "Password is required" })
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters.")
      .max(128, "Password must be at most 128 characters."),
    confirmPassword: z
      .string({ message: "Confirm password is required" })
      .min(1, "Confirm password is required")
      .min(8, "Confirm password must be at least 8 characters.")
      .max(128, "Confirm password must be at most 128 characters."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type ContactFormValues = z.infer<typeof formSchema>;

export function SignupPopup() {
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  useEffect(() => {
    const handler = () => setOpen(true);
    if (typeof window !== "undefined")
      window.addEventListener("open-signup", handler);
    return () => {
      if (typeof window !== "undefined")
        window.removeEventListener("open-signup", handler);
    };
  }, []);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      emailAddress: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: ContactFormValues) {
    setIsLoading(true);
    setApiError(null);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${data.firstName} ${data.lastName}`,
          email: data.emailAddress,
          phone: data.phoneNumber,
          password: data.password,
        }),
      });
      const result = await res.json() as { error?: string };
      if (!res.ok) {
        setApiError(result.error || "Registration failed");
        return;
      }
      // Success — close signup and notify header to refresh session
      setOpen(false);
      form.reset();
      window.dispatchEvent(new CustomEvent("auth-change"));
    } catch {
      setApiError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  const openLogin = () => {
    // close signup and notify login popup to open
    setOpen(false);
    if (typeof window !== "undefined")
      window.dispatchEvent(new CustomEvent("open-login"));
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="w-full max-w-162.5! rounded-none pt-10.5 pb-12 px-13 max-h-[90vh] overflow-y-auto">
        <AlertDialogCancel className="bg-transparent hover:bg-transparent absolute top-4 right-4 p-0">
          <X className="cursor-pointer text-secondary-black" />
        </AlertDialogCancel>
        <AlertDialogHeader className="place-items-start text-left">
          <AlertDialogTitle className=" font-poppins font-medium text-4xl text-secondary-black">
            Signup
          </AlertDialogTitle>
          <AlertDialogDescription className=" font-poppins font-medium text-base w-full">
            Already have an account ?{" "}
            <button
              type="button"
              onClick={openLogin}
              className="font-bold text-primary cursor-pointer"
            >
              Login
            </button>
            <div className="w-full mt-9">
              <form
                className="space-y-3.5 w-full"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                {apiError && (
                  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 text-sm font-poppins rounded">
                    {apiError}
                  </div>
                )}
                <div className="flex gap-5 w-full!">
                  <div className="w-1/2">
                    <Controller
                      name="firstName"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <div>
                          <CustomInput
                            {...field}
                            icon={User}
                            aria-invalid={fieldState.invalid}
                            type="text"
                            label="First Name"
                            placeholder="Enter your first name"
                            id="firstName"
                            className={cn("", {
                              "border-red-500": fieldState.error,
                            })}
                            labelClassName={cn("text-[#383838]", {
                              "text-red-500": fieldState.error,
                            })}
                          />
                          {fieldState.error?.message && (
                            <p className="mt-1 text-sm text-red-500 focus-within:border-red-500">
                              {fieldState.error.message}
                            </p>
                          )}
                        </div>
                      )}
                    />
                  </div>
                  <div className="w-1/2">
                    <Controller
                      name="lastName"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <div>
                          <CustomInput
                            {...field}
                            icon={User}
                            aria-invalid={fieldState.invalid}
                            type="text"
                            label="Last Name"
                            placeholder="Enter your last name"
                            id="lastName"
                            className={cn("", {
                              "border-red-500": fieldState.error,
                            })}
                            labelClassName={cn("text-[#383838]", {
                              "text-red-500": fieldState.error,
                            })}
                          />
                          {fieldState.error?.message && (
                            <p className="mt-1 text-sm text-red-500 focus-within:border-red-500">
                              {fieldState.error.message}
                            </p>
                          )}
                        </div>
                      )}
                    />
                  </div>
                </div>

                <Controller
                  name="emailAddress"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <div>
                      <CustomInput
                        {...field}
                        icon={Mail}
                        aria-invalid={fieldState.invalid}
                        type="email"
                        label="Email Address"
                        placeholder="Enter your email address"
                        id="emailAddress"
                        className={cn("", {
                          "border-red-500": fieldState.error,
                        })}
                        labelClassName={cn("text-[#383838]", {
                          "text-red-500": fieldState.error,
                        })}
                      />
                      {fieldState.error?.message && (
                        <p className="mt-1 text-sm text-red-500">
                          {fieldState.error.message}
                        </p>
                      )}
                    </div>
                  )}
                />
                <Controller
                  name="phoneNumber"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <div>
                      <CustomInput
                        {...field}
                        icon={Phone}
                        aria-invalid={fieldState.invalid}
                        type="text"
                        label="Phone Number"
                        placeholder="Enter phone number"
                        id="phoneNumber"
                        className={cn("", {
                          "border-red-500": fieldState.error,
                        })}
                        labelClassName={cn("text-[#383838]", {
                          "text-red-500": fieldState.error,
                        })}
                      />
                      {fieldState.error?.message && (
                        <p className="mt-1 text-sm text-red-500">
                          {fieldState.error.message}
                        </p>
                      )}
                    </div>
                  )}
                />
                <Controller
                  name="password"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <div className="relative">
                      <div
                        className="absolute bottom-4 right-4 z-20"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="text-black/40" />
                        ) : (
                          <Eye className="text-black/40" />
                        )}
                      </div>
                      <CustomInput
                        {...field}
                        icon={Lock}
                        aria-invalid={fieldState.invalid}
                        type={showPassword ? "text" : "password"}
                        label="Password"
                        placeholder="Enter your password"
                        id="password"
                        className={cn("", {
                          "border-red-500": fieldState.error,
                        })}
                        labelClassName={cn("text-[#383838]", {
                          "text-red-500": fieldState.error,
                        })}
                      />
                      {fieldState.error?.message && (
                        <p className="mt-1 text-sm text-red-500">
                          {fieldState.error.message}
                        </p>
                      )}
                    </div>
                  )}
                />
                <Controller
                  name="confirmPassword"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <div className="relative">
                      <div
                        className="absolute bottom-4 right-4 z-20"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="text-black/40" />
                        ) : (
                          <Eye className="text-black/40" />
                        )}
                      </div>
                      <CustomInput
                        {...field}
                        icon={Lock}
                        aria-invalid={fieldState.invalid}
                        type={showPassword ? "text" : "password"}
                        label="Confirm Password"
                        placeholder="Confirm your password"
                        id="confirmPassword"
                        className={cn("", {
                          "border-red-500": fieldState.error,
                        })}
                        labelClassName={cn("text-[#383838]", {
                          "text-red-500": fieldState.error,
                        })}
                      />
                      {fieldState.error?.message && (
                        <p className="mt-1 text-sm text-red-500">
                          {fieldState.error.message}
                        </p>
                      )}
                    </div>
                  )}
                />
                {/* <p className="flex justify-end font-poppins font-medium text-[#838383] -mt-2 cursor-pointer">Forget password?</p> */}

                <div className="flex justify-end mt-6">
                  <Button type="submit" className="px-16  w-full" disabled={isLoading}>
                    {isLoading ? "Signing up..." : "Sign Up"}
                  </Button>
                </div>
              </form>
            </div>
            {/* <div className="flex items-center py-6.5">
                            <div className="w-full h-[0.5px] bg-[#E9E9E9]" />
                            <p className="mx-2 text-sm text-secondary-black/40 font-poppins font-medium">or</p>
                            <div className="w-full h-[0.5px] bg-[#E9E9E9]" />
                        </div>
                        <div className="flex justify-between ">
                            <div className="flex items-center px-5 py-1 bg-[#F2F2F2] hover:bg-[#E0E0E0]">
                                <Image src="/social/google.svg" alt="Google Icon" width={30} height={30} />
                                <Button className="text-sm px-0 pl-5 pr-7 font-poppins font-medium bg-transparent text-secondary-black/40 hover:bg-transparent">
                                    Sign in with Google
                                </Button>
                            </div>
                            <div className="flex items-center px-5 py-1 bg-[#F2F2F2] hover:bg-[#E0E0E0]">
                                <Image src="/social/fb.svg" alt="Facebook Icon" width={30} height={30} />
                                <Button className="text-sm px-0 pl-5 pr-7 font-poppins font-medium bg-transparent hover:bg-transparent text-secondary-black/40 ">
                                    Sign in with Facebook
                                </Button>
                            </div>

                        </div> */}
          </AlertDialogDescription>
        </AlertDialogHeader>
        {/* <AlertDialogFooter>
                    <AlertDialogCancel >Cancel</AlertDialogCancel>
                    <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter> */}
      </AlertDialogContent>
    </AlertDialog>
  );
}
