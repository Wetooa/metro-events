

import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { toast } from "react-toastify"
import { FormEvent } from "react";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function handleAsyncFunction(asyncFunc: () => Promise<any>, successMessage?: string) {
  try {
    await asyncFunc();
    toast.success(successMessage ?? "Task was successful!");
  } catch (error: any) {
    toast.error(`Error: ${error.message}`);
  }
}


export function formEventToObject(formEvent: FormEvent) {
  const result: any = {};
  const formData = new FormData(formEvent.target as HTMLFormElement);

  formData.forEach((value, key) => {
    result[key] = value;
  })

  return result;
}
