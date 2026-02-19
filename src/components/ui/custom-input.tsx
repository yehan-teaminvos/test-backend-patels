import * as React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type CustomInputProps = React.ComponentProps<"input"> & {
  icon?: LucideIcon;
  label?: string;
  className?: string;
  labelClassName?: string;
};

function CustomInput({
  className,
  type,
  icon: Icon,
  label,
  id,
  labelClassName,
  ...props
}: CustomInputProps) {
  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className={cn(
            "mb-2 block w-fit font-poppins font-bold",
            labelClassName,
          )}
        >
          {label}
        </label>
      )}

      <div
        className={cn(
          "flex items-center bg-[#F2F2F2] relative border border-transparent focus-within:border-black/40 duration-200",
          className,
        )}
      >
        {Icon && (
          <div className="absolute left-5">
            <Icon className="size-5 text-black/40" />
          </div>
        )}
        <input
          id={id}
          type={type}
          data-slot="input"
          className={cn(
            "file:text-foreground pl-15 pr-5 font-poppins placeholder:text-black/40 placeholder:text-sm sm:placeholder:text-base  selection:bg-primary selection:text-primary-foreground dark:bg-input/30 w-full text-black min-w-0 bg-transparent py-5 text-base transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            "focus-visible:border-ring ",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          )}
          {...props}
        />
      </div>
    </div>
  );
}

export { CustomInput };
