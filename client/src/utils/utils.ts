
import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {toast} from "react-toastify"
import { FormEvent } from "react";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export async function handleSupabaseAsyncError<T extends () => any>(asyncFunc: T, successMessage?: string): Promise<ReturnType<T> | null> {
  try { 
    const result =  await asyncFunc();
    if (!result || result.error) throw new Error(result.error.message);
    toast.success(successMessage ?? "Task was successful!");
    return result;
  } catch(error: any) {
    toast.error(`Error: ${error.message}`);
  }
  return null;
}


export function formEventToObject(formEvent: FormEvent) {
  const result: any = {};
  const formData = new FormData(formEvent.target as HTMLFormElement);

  formData.forEach((value, key) => {
    result[key] = value;
  })

  return result;
}
