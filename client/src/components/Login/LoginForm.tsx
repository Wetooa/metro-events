"use client";

import { FormEvent } from "react";
import Button from "../UI/Button";
import Input from "../UI/Input";
import { supabase } from "@/utils/supabase";
import { formEventToObject, handleAsyncFunction } from "@/utils/utils";
import Link from "next/link";
import { fetchUser } from "@/context/features/user/userSlice";
import { useAppDispatch } from "@/context/hooks";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    const inputs = formEventToObject(event);

    await handleAsyncFunction(async () => {
      await supabase.auth.signInWithPassword({
        email: inputs.email,
        password: inputs.password,
        options: {
          // emailRedirectTo: "https//example.com/welcome",
        },
      });
      dispatch(fetchUser());
      router.push("/");
    }, "User logged up successfully!");
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
