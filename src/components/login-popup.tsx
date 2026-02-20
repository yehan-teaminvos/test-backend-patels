import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Mail, User, Lock, Eye, EyeOff, X } from "lucide-react"
import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { CustomInput } from "./ui/custom-input";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";


type Styleprops = {
    iconStyle?: string;
    onLoginSuccess?: () => void;
}

const formSchema = z.object({


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
});

type ContactFormValues = z.infer<typeof formSchema>;

export function LoginPopup({ iconStyle, onLoginSuccess }: Styleprops) {

    const [showPassword, setShowPassword] = useState(false);
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState<string | null>(null);

    useEffect(() => {
        const handler = () => setOpen(true)
        if (typeof window !== 'undefined') window.addEventListener('open-login', handler)
        return () => {
            if (typeof window !== 'undefined') window.removeEventListener('open-login', handler)
        }
    }, [])

    const form = useForm<ContactFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            emailAddress: "",
            password: "",
        },
    });

    async function onSubmit(data: ContactFormValues) {
        setIsLoading(true);
        setApiError(null);
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: data.emailAddress,
                    password: data.password,
                }),
            });
            const result = await res.json() as { error?: string };
            if (!res.ok) {
                setApiError(result.error || "Login failed");
                return;
            }
            // Success — close popup, notify header to refresh session
            setOpen(false);
            form.reset();
            window.dispatchEvent(new CustomEvent("auth-change"));
            if (onLoginSuccess) onLoginSuccess();
        } catch {
            setApiError("Network error. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }
    const openSignup = () => {
        // close login and notify signup popup to open
        setOpen(false)
        if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('open-signup'))
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <User className={cn(`h-5 w-5 cursor-pointer text-light-gray`, iconStyle)} />
            </AlertDialogTrigger>
            <AlertDialogContent className=" w-full max-w-[650px]! rounded-none pt-10.5 pb-12 px-13 max-h-[90vh] overflow-y-auto">
                <AlertDialogCancel className="bg-transparent hover:bg-transparent absolute top-4 right-4 p-0">
                    <X className="cursor-pointer text-secondary-black" />
                </AlertDialogCancel>
                <AlertDialogHeader className="place-items-start text-left">
                    <AlertDialogTitle className="font-poppins font-medium text-4xl text-secondary-black ">Login</AlertDialogTitle>
                    <AlertDialogDescription className="font-poppins font-medium text-base w-full">
                        Don’t have an account? <button type="button" onClick={openSignup} className="font-bold text-primary cursor-pointer">Signup</button>
                        <div className="w-full mt-9">
                            <form className="space-y-3.5 w-full" onSubmit={form.handleSubmit(onSubmit)}>
                                {apiError && (
                                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 text-sm font-poppins rounded">
                                        {apiError}
                                    </div>
                                )}


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
                                                label="Email"
                                                placeholder="Enter email address"
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
                                    name="password"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <div className="relative">
                                            <div className="absolute bottom-4 right-4 z-20" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff className="text-black/40" /> : <Eye className="text-black/40" />}</div>
                                            <CustomInput
                                                {...field}
                                                icon={Lock}
                                                aria-invalid={fieldState.invalid}
                                                type={showPassword ? "text" : "password"}
                                                label="Password"
                                                placeholder="Enter password"
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
                                <Link href="/forgot-password" onClick={() => setOpen(false)} className="flex justify-end font-poppins font-medium text-[#838383] -mt-2 cursor-pointer">Forget password?</Link>

                                <div className="flex justify-end mt-6">
                                    <Button type="submit" className="px-16  w-full" disabled={isLoading}>
                                        {isLoading ? "Signing in..." : "Sign In"}
                                    </Button>
                                </div>
                            </form>
                        </div>
                        <div className="flex items-center py-6.5">
                            <div className="w-full h-[0.5px] bg-[#E9E9E9]" />
                            <p className="mx-2 text-sm text-secondary-black/40 font-poppins font-medium">or</p>
                            <div className="w-full h-[0.5px] bg-[#E9E9E9]" />
                        </div>
                        <div className="flex sm:flex-row flex-col justify-between max-sm:gap-6 ">
                            <div className="flex justify-center items-center px-5 py-1 bg-[#F2F2F2] hover:bg-[#E0E0E0]">
                                <Image src="/social/google.svg" alt="Google Icon" width={30} height={30} />
                                <Button className="text-sm px-0 pl-5 pr-7 font-poppins font-medium bg-transparent text-secondary-black/40 hover:bg-transparent">
                                    Sign in with Google
                                </Button>
                            </div>
                            <div className="flex justify-center items-center px-5 py-1 bg-[#F2F2F2] hover:bg-[#E0E0E0]">
                                <Image src="/social/fb.svg" alt="Facebook Icon" width={30} height={30} />
                                <Button className="text-sm px-0 pl-5 pr-7 font-poppins font-medium bg-transparent hover:bg-transparent text-secondary-black/40 ">
                                    Sign in with Facebook
                                </Button>
                            </div>

                        </div>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                {/* <AlertDialogFooter>
                    <AlertDialogCancel >Cancel</AlertDialogCancel>
                    <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter> */}
            </AlertDialogContent>
        </AlertDialog>
    )
}
