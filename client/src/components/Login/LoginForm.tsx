"use client";

import { FormEvent } from "react";
import Button from "../UI/Button";
import Input from "../UI/Input";
import { supabase } from "@/utils/supabase";
import { formEventToObject, handleSupabaseAsyncError } from "@/utils/utils";
import Link from "next/link";
import { fetchUser } from "@/context/features/user/userSlice";
import { useAppDispatch } from "@/context/hooks";

export default function LoginForm() {
  const dispatch = useAppDispatch();

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    const inputs = formEventToObject(event);

    const result = await handleSupabaseAsyncError(
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

    if (result) dispatch(fetchUser());
  }

  return (
    <section>
      <form onSubmit={handleLogin}>
        <Input name="email" />
        <Input name="password" type="password" />

        <Button isLoading={false}>Login</Button>
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
