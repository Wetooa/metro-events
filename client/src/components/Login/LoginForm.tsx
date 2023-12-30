"use client";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "../UI/Form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { fetchUser } from "@/context/features/user/userSlice";
import { useAppDispatch } from "@/context/hooks";
import { useRouter } from "next/navigation";
import { toast, useToast } from "../UI/Toast/use-toast";
import { Button } from "../UI/Button";
import { Input } from "../UI/Input";
import { useForm } from "react-hook-form";
import { Separator } from "../UI/Separator";

const loginFormSchema = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .min(2, { message: "Password must be at least 2 characters long" })
      .max(20, { message: "Password must be at most 20 characters long" }),
  })
  .required();

export default function LoginForm() {
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const loginForm = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function handleLogin(values: z.infer<typeof loginFormSchema>) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
        options: {
          // emailRedirectTo: "https//example.com/welcome",
        },
      });
      if (error) throw new Error(error.message);
      dispatch(fetchUser());
      toast({
        title: "Login Success",
        description: "User logged in successfully!",
      });
      router.back();
    } catch (error: any) {
      toast({ title: "Login Error", description: error.message });
    }
  }

  return (
    <section className="space-y-4">
      <Form {...loginForm}>
        <form
          onSubmit={loginForm.handleSubmit(handleLogin)}
          className="space-y-4 mt-5"
        >
          <FormField
            control={loginForm.control}
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
          <FormField
            control={loginForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="*********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormItem>
            )}
          />

          <Button type="submit">Login</Button>
        </form>
      </Form>

      <Separator />

      <div className="text-xs">
        Don&apos;t have an account?{" "}
        <Link className="a-link" href={"/register"}>
          Register now
        </Link>
      </div>
    </section>
  );
}
