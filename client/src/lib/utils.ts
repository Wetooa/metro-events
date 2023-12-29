import { type ClassValue, clsx } from "clsx"
import { FormEvent } from "react";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

