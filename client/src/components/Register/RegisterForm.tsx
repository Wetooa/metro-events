"use client";

import React, { FormEvent } from "react";
import Input from "../UI/Input";
import Textarea from "../UI/Textarea";
import Button from "../UI/Button";
import { supabase } from "@/utils/supabase";
import { formEventToObject, handleSupabaseAsyncError } from "@/utils/utils";
import Link from "next/link";

export default function RegisterForm() {
  async function handleRegister(event: FormEvent) {
    event.preventDefault();

    const inputs = formEventToObject(event);

    await handleSupabaseAsyncError(
      () =>
        supabase.auth.signUp({
          email: inputs.email,
          password: inputs.password,
          options: {
            data: inputs,
            // emailRedirectTo: "https//example.com/welcome",
          },
        }),
      "User signed up successfully!"
    );
  }

  return (
    <section className="p-4">
      <h4>Register</h4>

      <form action="" onSubmit={handleRegister}>
        <Input name="firstname" />
        <Input name="lastname" />
        <Input name="username" />
        <Input name="birthday" />
        <Input name="address" />

        <Input name="email" type="email" />
        <Input name="password" type="password" />

        <Textarea name="info" />

        <Button isLoading={false}>Register</Button>
      </form>

      <div className="text-xs">
        Already have an account?{" "}
        <Link className="a-link" href={"/login"}>
          Log in now
        </Link>
      </div>
    </section>
  );
}
