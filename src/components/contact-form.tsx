"use client";

import { Mail, MessageSquare, Phone, User } from "lucide-react";
import { CustomInput } from "./ui/custom-input";
import { CustomTextArea } from "./ui/custom-text-area";
import { Button } from "./ui/button";
import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  fullName: z
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

  message: z
    .string({ message: "Message is required" })
    .min(1, "Message is required")
    .min(10, "Message must be at least 10 characters.")
    .max(500, "Message must be at most 500 characters."),
});

type ContactFormValues = z.infer<typeof formSchema>;

export default function ContactForm() {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      emailAddress: "",
      message: "",
    },
  });

  function onSubmit(data: ContactFormValues) {
    console.log(data);
  }

  return (
    <div>
      <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
        <Controller
          name="fullName"
          control={form.control}
          render={({ field, fieldState }) => (
            <div>
              <CustomInput
                {...field}
                icon={User}
                aria-invalid={fieldState.invalid}
                type="text"
                label="Full Name"
                placeholder="Enter name"
                id="fullName"
                className={cn("", {
                  "border-red-500": fieldState.error,
                })}
                labelClassName={cn("", {
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
                labelClassName={cn("", {
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
                placeholder="Enter email address"
                id="emailAddress"
                className={cn("", {
                  "border-red-500": fieldState.error,
                })}
                labelClassName={cn("", {
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
          name="message"
          control={form.control}
          render={({ field, fieldState }) => (
            <div>
              <CustomTextArea
                {...field}
                icon={MessageSquare}
                aria-invalid={fieldState.invalid}
                label="Message"
                placeholder="Enter message"
                id="message"
                className={cn("", {
                  "border-red-500": fieldState.error,
                })}
                labelClassName={cn("", {
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

        <div className="flex justify-end">
          <Button type="submit" className="px-16">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
