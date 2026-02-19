"use client";

import { Mail, Phone, User, Check } from "lucide-react";
import { CustomInput } from "./ui/custom-input";
import { Button } from "./ui/button";
import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { useState } from "react";

const formSchema = z.object({
  firstName: z
    .string({ message: "First name is required" })
    .min(1, "First name is required")
    .min(2, "First name must be at least 2 characters.")
    .max(50, "First name must be at most 50 characters."),

  lastName: z
    .string({ message: "Last name is required" })
    .min(1, "Last name is required")
    .min(2, "Last name must be at least 2 characters.")
    .max(50, "Last name must be at most 50 characters."),

  emailAddress: z
    .string({ message: "Email address is required" })
    .min(1, "Email address is required")
    .email("Invalid email address.")
    .max(100, "Email must be at most 100 characters."),

  primaryPhone: z
    .string({ message: "Primary phone number is required" })
    .min(1, "Primary phone number is required")
    .min(10, "Phone number must be at least 10 characters.")
    .max(15, "Phone number must be at most 15 characters."),
});

type SenderFormValues = z.infer<typeof formSchema>;

interface SenderFormProps {
  onSameAsReceiver?: (checked: boolean) => void;
}

export function SenderForm({ onSameAsReceiver }: SenderFormProps) {
  const [sameAsReceiver, setSameAsReceiver] = useState(false);

  const form = useForm<SenderFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      emailAddress: "",
      primaryPhone: "",
    },
  });

  function onSubmit(data: SenderFormValues) {
    console.log(data);
  }

  const handleSameAsReceiverChange = (checked: boolean) => {
    setSameAsReceiver(checked);
    if (onSameAsReceiver) {
      onSameAsReceiver(checked);
    }
  };

  return (
    <div>
      <div className=" items-center justify-between mb-6">
        <h2 className="text-2xl font-poppins font-semibold">
          Sender Information
        </h2>

        <div className="items-center gap-2 flex mt-3">
          <label
            htmlFor="sameAsReceiver"
            className="flex items-center gap-2 cursor-pointer"
          >
            <input
              type="checkbox"
              id="sameAsReceiver"
              checked={sameAsReceiver}
              onChange={(e) => handleSameAsReceiverChange(e.target.checked)}
              className="sr-only"
            />
            <div
              className={cn(
                "w-4 h-4 border-2 rounded flex items-center justify-center transition-all",
                sameAsReceiver
                  ? "bg-white border-primary"
                  : "bg-transparent border-[#000D0E66]/20",
              )}
            >
              {sameAsReceiver && (
                <Check className="w-3 h-3 text-primary" strokeWidth={3} />
              )}
            </div>
            <span className="font-poppins text-sm font-medium text-[#000D0E66]">
              Same As Receiver
            </span>
          </label>
        </div>
      </div>

      <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                  disabled={sameAsReceiver}
                  className={cn("", {
                    "border-red-500": fieldState.error,
                    "opacity-60": sameAsReceiver,
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
                  disabled={sameAsReceiver}
                  className={cn("", {
                    "border-red-500": fieldState.error,
                    "opacity-60": sameAsReceiver,
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
                disabled={sameAsReceiver}
                className={cn("", {
                  "border-red-500": fieldState.error,
                  "opacity-60": sameAsReceiver,
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
          name="primaryPhone"
          control={form.control}
          render={({ field, fieldState }) => (
            <div>
              <CustomInput
                {...field}
                icon={Phone}
                aria-invalid={fieldState.invalid}
                type="tel"
                label="Primary Phone Number"
                placeholder="Enter your primary phone number"
                id="primaryPhone"
                disabled={sameAsReceiver}
                className={cn("", {
                  "border-red-500": fieldState.error,
                  "opacity-60": sameAsReceiver,
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
      </form>
    </div>
  );
}
