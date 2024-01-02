"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/UI/Avatar";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

interface AvatarComponentProps {
  fc?: () => {};
  fallbackText: Array<string | null>;
  userId: string;
}

export default function AvatarComponent({
  fallbackText,
  fc,
  userId,
}: Readonly<AvatarComponentProps>) {
  const router = useRouter();
  const imageUrl = supabase.storage.from("avatars").getPublicUrl(`${userId}`)
    .data.publicUrl;

  return (
    <Avatar
      className={"hover:opacity-80 transition-all"}
      onClick={
        fc ??
        ((event) => {
          event.stopPropagation();
          router.push(`/profile/${userId}`);
        })
      }
    >
      <AvatarImage src={imageUrl} />
      <AvatarFallback>
        {fallbackText
          .map((str) => {
            return str ? str[0].toUpperCase() : "";
          })
          .join("")}
      </AvatarFallback>
    </Avatar>
  );
}
