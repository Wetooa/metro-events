import { cn } from "@/utils/utils";
import { VariantProps, cva } from "class-variance-authority";
import { InputHTMLAttributes } from "react";

export const inputVariants = cva(
  "border rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50 dark:focus:ring-orange-400 dark:focus:ring-offset-slate-900 bg-white/20 text-white",
  {
    variants: {
      variant: {
        default: "border-zinc-300 placeholder-zinc-500 focus:border-slate-300",
        outline: "border-zinc-300 placeholder-zinc-500 focus:border-slate-300",
        subtle: "border-zinc-300 placeholder-zinc-500  focus:border-slate-300",
        ghost:
          "border-transparent placeholder-zinc-400  focus:border-transparent",
      },
      sizeVariant: {
        default: "h-10 py-1 px-2",
        sm: "h-9 px-2 rounded-md",
        xs: "h-8 px-1.5 rounded-sm",
        lg: "h-11 px-8 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      sizeVariant: "default",
    },
  }
);

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  title?: string;
}

export default function Input({
  title,
  variant,
  sizeVariant,
  className,
  ...props
}: Readonly<InputProps>) {
  const name = props.name ?? "";
  title = title ?? name?.substring(0, 1).toUpperCase() + name?.substring(1);

  return (
    <>
      <label htmlFor={props.name}>{title}</label>
      <input
        className={cn(inputVariants({ variant, sizeVariant, className }))}
        {...props}
      />
    </>
  );
}
