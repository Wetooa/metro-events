"use client";

import { FormEvent } from "react";
import Button from "../UI/Button";
import Input from "../UI/Input";
import { supabase } from "@/utils/supabase";
import { formEventToObject, handleSupabaseAsyncError } from "@/utils/utils";
import Link from "next/link";

export default function LoginForm() {
  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    const inputs = formEventToObject(event);

    await handleSupabaseAsyncError(
      () =>
        supabase.auth.signInWithPassword({
          email: inputs.email,
          password: inputs.password,
          options: {
            // emailRedirectTo: "https//example.com/welcome",
          },
        }),
      "User logged up successfully!"
    );
  }

  return (
    <section>
      <form onSubmit={handleLogin}>
        <Input name="email" />
        <Input name="password" type="password" />

        <Button isLoading={false}>Register</Button>
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
