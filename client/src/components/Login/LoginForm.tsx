"use client";

import { FormEvent } from "react";
import { supabase } from "@/lib/supabase";
import { formEventToObject } from "@/lib/utils";
import Link from "next/link";
import { fetchUser } from "@/context/features/user/userSlice";
import { useAppDispatch } from "@/context/hooks";
import { useRouter } from "next/navigation";
import { toast, useToast } from "../UI/Toast/use-toast";
import { Button } from "../UI/Button";
import { Input } from "../UI/Input";

export default function LoginForm() {
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const router = useRouter();

  async function handleLogin(event: FormEvent) {
    event.preventDefault();
    const inputs = formEventToObject(event);

    try {
      await supabase.auth.signInWithPassword({
        email: inputs.email,
        password: inputs.password,
        options: {
          // emailRedirectTo: "https//example.com/welcome",
        },
      });
      dispatch(fetchUser());
      toast({
        title: "Login Sucess",
        description: "User logged in successfully!",
      });
      router.push("/");
    } catch (error: any) {
      toast({ title: "Login Error", description: error.message });
    }
  }

  return (
    <section>
      <form onSubmit={handleLogin}>
        <Input name="email" />
        <Input name="password" type="password" />

        <Button>Login</Button>
      </form>

      <div className="text-xs">
        Don&apos;t have an account?{" "}
        <Link className="a-link" href={"/register"}>
          Register now
        </Link>
      </div>
    </section>
  );
}
