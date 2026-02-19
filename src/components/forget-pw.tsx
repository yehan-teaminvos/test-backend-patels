"use client"
import { Button } from './ui/button'
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { CustomInput } from "@/components/ui/custom-input";
import { Mail } from 'lucide-react';

const ForgotPasswordForm = () => {

    const formSchema = z.object({


        emailAddress: z
            .string({ message: "Email address is required" })
            .min(1, "Email address is required")
            .email("Invalid email address.")
            .max(50, "Email must be at most 50 characters."),
    });

    type ContactFormValues = z.infer<typeof formSchema>;
    const form = useForm<ContactFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            emailAddress: "",

        },
    });

    function onSubmit(data: ContactFormValues) {
        console.log(data);
    }


    return (
        <div>
            <form className="space-y-3.5 w-full" onSubmit={form.handleSubmit(onSubmit)}>
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
                <div className="flex justify-end mt-6">
                    <Button type="submit" className="px-10">
                        Send Email
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default ForgotPasswordForm