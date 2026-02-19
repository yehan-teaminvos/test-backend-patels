"use client";

import { MapPin, Phone, User, Globe } from "lucide-react";
import { CustomInput } from "./ui/custom-input";
import { Button } from "./ui/button";
import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

  address: z
    .string({ message: "Address is required" })
    .min(1, "Address is required")
    .min(10, "Address must be at least 10 characters.")
    .max(200, "Address must be at most 200 characters."),

  country: z
    .string({ message: "Country/Region is required" })
    .min(1, "Country/Region is required"),

  city: z.string({ message: "City is required" }).min(1, "City is required"),

  postalCode: z
    .string({ message: "Postal code is required" })
    .min(1, "Postal code is required")
    .min(4, "Postal code must be at least 4 characters.")
    .max(10, "Postal code must be at most 10 characters."),

  primaryPhone: z
    .string({ message: "Primary phone number is required" })
    .min(1, "Primary phone number is required")
    .min(10, "Phone number must be at least 10 characters.")
    .max(15, "Phone number must be at most 15 characters."),

  secondaryPhone: z
    .string()
    .min(10, "Phone number must be at least 10 characters.")
    .max(15, "Phone number must be at most 15 characters.")
    .optional()
    .or(z.literal("")),
});

type RecipientFormValues = z.infer<typeof formSchema>;

const countries = [
  "Sri Lanka",
  "India",
  "United States",
  "United Kingdom",
  "Australia",
  "Canada",
];

const cities = [
  "Colombo",
  "Kandy",
  "Galle",
  "Jaffna",
  "Negombo",
  "Batticaloa",
  "Matara",
  "Anuradhapura",
];

export function RecipientForm() {
  const form = useForm<RecipientFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      address: "",
      country: "Sri Lanka",
      city: "Colombo",
      postalCode: "",
      primaryPhone: "",
      secondaryPhone: "",
    },
  });

  function onSubmit(data: RecipientFormValues) {
    console.log(data);
  }

  return (
    <div>
      <h2 className="text-2xl font-poppins font-semibold mb-6">
        Recipient Information
      </h2>

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
          name="address"
          control={form.control}
          render={({ field, fieldState }) => (
            <div>
              <CustomInput
                {...field}
                icon={MapPin}
                aria-invalid={fieldState.invalid}
                type="text"
                label="Address"
                placeholder="Enter your address"
                id="address"
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
          name="country"
          control={form.control}
          render={({ field, fieldState }) => (
            <div>
              <label
                htmlFor="country"
                className={cn("mb-2 block w-fit font-poppins font-bold", {
                  "text-red-500": fieldState.error,
                })}
              >
                Country/Region
              </label>
              <div className="relative">
                <Globe className="absolute left-5 top-1/2 -translate-y-1/2 size-[17px] text-black/40 z-10" />
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger
                    className={cn(
                      "w-full bg-[#F2F2F2] border-transparent focus-within:border-black/70 h-auto pl-15 text-[#000D0E66] font-poppins sm:text-base text-sm",
                      {
                        "border-red-500": fieldState.error,
                      },
                    )}
                    aria-invalid={fieldState.invalid}
                  >
                    <SelectValue placeholder="Select country/region text-[#000D0E66] font-poppins" />
                  </SelectTrigger>
                  <SelectContent className="font-poppins text-[#0e000166]">
                    {countries.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {fieldState.error?.message && (
                <p className="mt-1 text-sm text-red-500">
                  {fieldState.error.message}
                </p>
              )}
            </div>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Controller
            name="city"
            control={form.control}
            render={({ field, fieldState }) => (
              <div>
                <label
                  htmlFor="city"
                  className={cn("mb-2 block w-fit font-poppins font-bold", {
                    "text-red-500": fieldState.error,
                  })}
                >
                  City
                </label>
                <div className="relative">
                  <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 size-5 text-black/40 z-10" />
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger
                      className={cn(
                        "w-full bg-[#F2F2F2] border-transparent focus-within:border-black/40 h-auto pl-15 text-[#000D0E66] font-poppins sm:text-base text-sm",
                        {
                          "border-red-500": fieldState.error,
                        },
                      )}
                      aria-invalid={fieldState.invalid}
                    >
                      <SelectValue placeholder="Select your city text-[#000D0E66] font-poppins" />
                    </SelectTrigger>
                    <SelectContent className="font-poppins text-[#0e000166]">
                      {cities.map((city) => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {fieldState.error?.message && (
                  <p className="mt-1 text-sm text-red-500">
                    {fieldState.error.message}
                  </p>
                )}
              </div>
            )}
          />

          <Controller
            name="postalCode"
            control={form.control}
            render={({ field, fieldState }) => (
              <div>
                <CustomInput
                  {...field}
                  icon={MapPin}
                  aria-invalid={fieldState.invalid}
                  type="text"
                  label="Postal Code"
                  placeholder="Enter your postal code"
                  id="postalCode"
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
        </div>

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

        {/* Secondary Phone Number - Full Width */}
        <Controller
          name="secondaryPhone"
          control={form.control}
          render={({ field, fieldState }) => (
            <div>
              <CustomInput
                {...field}
                icon={Phone}
                aria-invalid={fieldState.invalid}
                type="tel"
                label="Secondary Phone Number"
                placeholder="Enter your secondary phone number"
                id="secondaryPhone"
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
      </form>
    </div>
  );
}
