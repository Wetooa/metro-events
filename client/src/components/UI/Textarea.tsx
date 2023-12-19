import { cn } from "@/utils/utils";
import { VariantProps } from "class-variance-authority";
import { TextareaHTMLAttributes } from "react";
import { inputVariants } from "./Input";

interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof inputVariants> {
  title?: string;
}

export default function Textarea({
  title,
  variant,
  sizeVariant,
  className,
  ...props
}: Readonly<TextareaProps>) {
  const name = props.name ?? "";
  title = title ?? name?.substring(0, 1).toUpperCase() + name?.substring(1);

  return (
    <>
      <label htmlFor={props.name}>{title}</label>
      <textarea
        className={cn(variant, sizeVariant, className)}
        {...props}
      ></textarea>
    </>
  );
}
