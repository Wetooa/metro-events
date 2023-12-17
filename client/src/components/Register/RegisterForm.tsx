"use client";

import React, { FormEvent } from "react";
import Input from "../UI/Input";
import { supabase } from "@/utils/supabase";

export default function RegisterForm() {
  async function handleRegister(event: FormEvent) {
    const { data, error } = await supabase.auth.signUp({
      email: "example@email.com",
      password: "example-password",
      options: {
        emailRedirectTo: "https//example.com/welcome",
      },
    });
  }

  return (
    <section>
      <form action="" onSubmit={handleRegister}>
        <Input title="" />
        <Input title="" />
        <Input title="" />
        <Input title="" />
      </form>
    </section>
  );
}
