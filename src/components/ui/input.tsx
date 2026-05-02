import * as React from "react";

import { cn } from "~/lib/utils";
type InputSize = "sm" | "md";

type InputProps = {
  size?: InputSize;
  iconStyle?: string;
  icon?: React.ElementType;
  iconPlacement?: "left" | "right";
  type?: string;
  className?: string;
} & Omit<React.ComponentProps<"input">, "size">;

const sizeClasses = {
  sm: "h-8 px-2 text-sm",
  md: "h-10 px-3 text-sm",
};

function Input({
  className,
  type,
  iconStyle = "",
  icon: Icon,
  iconPlacement = "left",
  size = "md", // Default size
  ...props
}: InputProps) {
  return (
    <div className="relative flex w-full items-center">
      {Icon && iconPlacement === "left" && (
        <div
          className={cn(
            "absolute top-1/2 -translate-y-1/2",
            size === "sm" ? "left-2" : "left-3",
          )}
        >
          <Icon className={iconStyle} />
        </div>
      )}
      <input
        type={type}
        data-slot="input"
        className={cn(
          "border-input file:text-foreground placeholder:text-foreground/60 focus-visible:border-ring focus-visible:ring-ring/50 disabled:bg-input/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 min-h-8 w-full min-w-0 rounded-sm border bg-white px-4.5 py-3 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-white file:text-sm file:font-medium focus-visible:ring-3 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:ring-3 md:text-sm",
          sizeClasses[size], // Apply size classes
          Icon && iconPlacement === "left"
            ? size === "sm"
              ? "pl-7"
              : "pl-9"
            : "",
          Icon && iconPlacement === "right"
            ? size === "sm"
              ? "pl-7"
              : "pr-9"
            : "",
          className,
        )}
        {...props}
      />
      {Icon && iconPlacement === "right" && (
        <div className="absolute top-1/2 right-3 -translate-y-1/2">
          <Icon className={iconStyle} />
        </div>
      )}
    </div>
  );
}

export { Input };
