import * as React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type CustomTextAreaProps = React.ComponentProps<"textarea"> & {
  icon?: LucideIcon;
  label?: string;
  className?: string;
  labelClassName?: string;
};

function CustomTextArea({
  className,
  icon: Icon,
  label,
  id,
  labelClassName,
  ...props
}: CustomTextAreaProps) {
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
          "relative flex bg-[#F2F2F2] border border-transparent focus-within:border-black/40 duration-200",
          className,
        )}
      >
        {Icon && (
          <div className="absolute left-5 top-5">
            <Icon className="size-5 text-black/40" />
          </div>
        )}
        <textarea
          id={id}
          data-slot="textarea"
          className={cn(
            "w-full bg-transparent py-5 pr-5 font-poppins text-black placeholder:text-black/40 placeholder:text-sm sm:placeholder:text-base  outline-none resize-none",
            Icon ? "pl-15" : "pl-5",
            "min-h-32 text-base md:text-sm",
            "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
          )}
          {...props}
        />
      </div>
    </div>
  );
}

export { CustomTextArea };
