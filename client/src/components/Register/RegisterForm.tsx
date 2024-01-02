"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { fetchUser } from "@/context/features/user/userSlice";
import { useAppDispatch } from "@/context/hooks";
import { useRouter } from "next/navigation";
import { useToast } from "../UI/Toast/use-toast";
import { Input } from "../UI/Input";
import { Button } from "../UI/Button";
import { Textarea } from "../UI/Textarea";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "../UI/Form";
import { DatePicker } from "../UI/DatePicker";
import { Label } from "../UI/Label";
import { Separator } from "../UI/Separator";

const registerFormSchema = z
  .object({
    firstname: z
      .string()
      .min(2, { message: "Firstname must be at least 2 characters long" })
      .max(25, { message: "Firstname must be at most 25 characters long" }),
    lastname: z
      .string()
      .min(2, { message: "Lastname must be at least 2 characters long" })
      .max(25, { message: "Lastname must be at most 25 characters long" }),
    username: z
      .string()
      .min(2, { message: "Username must be at least 2 characters long" })
      .max(50, { message: "Username must be at most 50 characters long" }),
    birthday: z.string(),
    address: z
      .string()
      .min(2, { message: "Address must be at least 2 characters long" })
      .max(50, { message: "Address must be at most 50 characters long" }),
    info: z
      .string()
      .min(2, { message: "Info must be at least 2 characters long" })
      .max(300, { message: "Info must not exceed 300 character limit" }),
    email: z.string().email(),
    password: z
      .string()
      .min(2, { message: "Password must be at least 2 characters long" })
      .max(20, { message: "Password must be at most 20 characters long" }),
    confirm: z
      .string()
      .min(2, { message: "Username must be at least 2 characters long" })
      .max(20, { message: "Username must be at most 20 characters long" }),
  })
  .required()
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"],
  });

export default function RegisterForm() {
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const registerForm = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      username: "",
      birthday: Date.now().toString(),
      address: "",
      email: "",
      password: "",
      confirm: "",
    },
  });

  async function handleRegister(values: z.infer<typeof registerFormSchema>) {
    const { password, confirm, ...filteredInputs } = values;
    try {
      const { error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: filteredInputs,
        },
      });
      if (error) throw new Error(error.message);

      dispatch(fetchUser());
      toast({
        title: "Register Success",
        description: "User registered successfully!",
      });
      router.push("/");
    } catch (error: any) {
      toast({ title: "Register Error", description: error.message });
    }
  }

  return (
    <section className="p-4 space-y-4 pb-10">
      <h3>Register</h3>

      <Form {...registerForm}>
        <form
          onSubmit={registerForm.handleSubmit(handleRegister)}
          className="space-y-8 mt-5"
        >
          <div className="flex gap-2 w-full">
            <div className="flex-1">
              <FormField
                control={registerForm.control}
                name="firstname"
                render={({ field }) => (
                  <FormItem>
                    <FormItem>
                      <FormLabel>Firstname</FormLabel>
                      <FormControl>
                        <Input autoFocus placeholder="ex. Adrian" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex-1">
              <FormField
                control={registerForm.control}
                name="lastname"
                render={({ field }) => (
                  <FormItem>
                    <FormItem>
                      <FormLabel>Lastname</FormLabel>
                      <FormControl>
                        <Input placeholder="ex. Sajulga" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <FormField
            control={registerForm.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="ex. Wetooa" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormItem>
            )}
          />
          <Separator />
          <FormField
            control={registerForm.control}
            name="birthday"
            render={({ field }) => (
              <FormItem>
                <FormItem>
                  <FormLabel>Birthday</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormItem>
            )}
          />
          <FormField
            control={registerForm.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="ex. Minglanilla Cebu" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormItem>
            )}
          />
          <FormField
            control={registerForm.control}
            name="info"
            render={({ field }) => (
              <FormItem>
                <FormItem>
                  <FormLabel>Info</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="ex. I love metro events!"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormItem>
            )}
          />
          <Separator />
          <FormField
            control={registerForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="ex. derpykidyt@gmail.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormItem>
            )}
          />
          <div className="flex gap-2 w-full">
            <div className="flex-1">
              <FormField
                control={registerForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex-1">
              <FormField
                control={registerForm.control}
                name="confirm"
                render={({ field }) => (
                  <FormItem>
                    <FormItem>
                      <FormLabel>Confirm</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Label>
            {/* terms and conditions or smth */}I accept the{" "}
            <Link href={"/"}>Terms and Conditions</Link>
          </Label>
          <Button type="submit">Register</Button>
        </form>
      </Form>

      <Separator />

      <div className="text-xs">
        Already have an account?{" "}
        <Link className="a-link" href={"/login"}>
          Log in now
        </Link>
      </div>
    </section>
  );
}
