"use client";

import { supabase } from "@/utils/supabase";
import React from "react";
import Button from "./UI/Button";
import { useAppDispatch } from "@/context/hooks";
import { fetchUser } from "@/context/features/user/userSlice";
import { handleAsyncFunction } from "@/utils/utils";
import { useRouter } from "next/navigation";

export default function Logout() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  async function handleLogout() {
    await handleAsyncFunction(async () => {
      await supabase.auth.signOut();
      dispatch(fetchUser());
      router.push("/");
    }, "User logged out successfully!");
  }

  return (
    <Button isLoading={false} onClick={handleLogout}>
      Logout
    </Button>
  );
}
