"use client";

import React, { FormEvent } from "react";
import Input from "../UI/Input";
import Textarea from "../UI/Textarea";
import Button from "../UI/Button";
import { supabase } from "@/utils/supabase";
import { formEventToObject, handleAsyncFunction } from "@/utils/utils";
import Link from "next/link";
import { fetchUser } from "@/context/features/user/userSlice";
import { useAppDispatch } from "@/context/hooks";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  async function handleRegister(event: FormEvent) {
    event.preventDefault();

    const inputs = formEventToObject(event);
    const { password, ...filteredInputs } = inputs;

    await handleAsyncFunction(async () => {
      await supabase.auth.signUp({
        email: inputs.email,
        password: inputs.password,
        options: {
          data: filteredInputs,
        },
      });
      dispatch(fetchUser());
      router.push("/");
    }, "User signed up successfully!");
  }

  return (
    <section className="p-4">
      <h4>Register</h4>

      <form action="" onSubmit={handleRegister}>
        <Input name="firstname" />
        <Input name="lastname" />
        <Input name="username" />
        <Input name="birthday" type="date" />
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
