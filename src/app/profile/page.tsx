"use client";
import { Button } from "@/components/ui/button";
import { Mail, User, Phone } from "lucide-react";
import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { CustomInput } from "@/components/ui/custom-input";

const formSchema = z.object({
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
});
type ContactFormValues = z.infer<typeof formSchema>;

export default function Profile() {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      emailAddress: "",
      lastName: "",
      phoneNumber: "",
    },
  });

  function onSubmit(data: ContactFormValues) {
    console.log(data);
  }
  return (
    <div>
      <section>
        <div className="">
          <h2 className="font-poppins font-medium text-2xl md:text-4xl text-secondary-black text-start pb-4">
            Account Details
          </h2>
          <p className="font-poppins font-light text-black/50 max-w-xl">
            Manage your account details.
          </p>
          <div className="w-full mt-9">
            <form
              className="space-y-3.5 w-full"
              onSubmit={form.handleSubmit(onSubmit)}
            >
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
                          placeholder="John"
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
                          placeholder="Doe"
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
                      placeholder="Johndoe@gmail.com"
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
                      placeholder="+94 77 123 45 678"
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

              {/* <p className="flex justify-end font-poppins font-medium text-[#838383] -mt-2 cursor-pointer">Forget password?</p> */}

              <div className="flex justify-end mt-6">
                <Button
                  type="submit"
                  className="font-poppins font-medium text-base "
                >
                  Update Profile
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
