
import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {toast} from "react-toastify"
import { FormEvent } from "react";
import { AuthResponse } from "@supabase/supabase-js";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export async function handleSupabaseAsyncError(asyncFunc: () => Promise<AuthResponse>, successMessage?: string): Promise<AuthResponse | null> {
  try { 
    const result =  await asyncFunc();
    if (!result || result.error) throw new Error(result.error.message);
    return result;

    toast.success(successMessage);
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
