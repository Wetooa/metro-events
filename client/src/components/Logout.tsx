"use client";

import { supabase } from "@/lib/supabase";
import React from "react";
import { useAppDispatch } from "@/context/hooks";
import { fetchUser } from "@/context/features/user/userSlice";
import { useRouter } from "next/navigation";
import { useToast } from "./UI/Toast/use-toast";
import { Button } from "./UI/Button";

export default function Logout() {
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const router = useRouter();

  async function handleLogout() {
    try {
      await supabase.auth.signOut();
      dispatch(fetchUser());
      toast({
        title: "Logged Out",
        description: "User logged out successfully",
      });
      router.push("/");
    } catch (error: any) {
      toast({ title: "Logout Error", description: error.message });
    }
  }

  return <Button onClick={handleLogout}>Logout</Button>;
}
