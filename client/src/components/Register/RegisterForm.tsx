"use client";

import React, { FormEvent, useState } from "react";
import Input from "../UI/Input";
import { supabase } from "@/utils/supabase";

const defaultRegisterInputs: RegisterFormInputs = {
  firstname: "",
  lastname: "",
  username: "",
  email: "",
  birthday: "",
  address: "",
  password: "",
};

export default function RegisterForm() {
  const [formInputs, setFormInputs] = useState<RegisterFormInputs>(
    defaultRegisterInputs
  );

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
