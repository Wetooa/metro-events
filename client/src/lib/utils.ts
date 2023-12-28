
import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { FormEvent } from "react";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function formEventToObject(formEvent: FormEvent) {
  const result: any = {};
  const formData = new FormData(formEvent.target as HTMLFormElement);

  formData.forEach((value, key) => {
    result[key] = value;
  })

  return result;
}
