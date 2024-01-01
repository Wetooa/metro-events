import AvatarComponent from "@/components/AvatarComponent";
import BackToHomeButton from "@/components/BackToHomeButton";
import EventsTabs from "@/components/Profile/EventsTabs";
import { Badge } from "@/components/UI/Badge";
import { Skeleton } from "@/components/UI/Skeleton";
import { supabase } from "@/lib/supabase";
import { dateFormatter } from "@/lib/utils";
import { UserProps } from "@/types/supabase.interface";
import {
  ClockIcon,
  ComponentPlaceholderIcon,
  HandIcon,
} from "@radix-ui/react-icons";
import { GetServerSidePropsContext } from "next";
import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/UI/Avatar";
import Image from "next/image";
import BadgeComponent from "@/components/BadgeComponent";

async function fetchProfile(id: string) {
  const { data, error } = await supabase.rpc("get_user", { user_id_input: id });
  // bad code but it will do
  return error ? null : ((data as any)[0] as UserProps);
}

export default async function Profile({
  params,
}: Readonly<GetServerSidePropsContext>) {
  if (!params || typeof params.id !== "string") return <Skeleton />;

  const user = await fetchProfile(params.id);

  if (!user) {
    return <Skeleton />;
  }

  const {
    id: userId,
    firstname,
    lastname,
    address,
    birthday,
    created_at,
    info,
    privilege,
    username,
  } = user;
  const coverPhotoUrl = supabase.storage
    .from("cover_photo")
    .getPublicUrl(`${userId}.jpg`).data.publicUrl;

  const imageUrl = supabase.storage
    .from("avatars")
    .getPublicUrl(`${userId}.jpg`).data.publicUrl;

  return (
    <section>
      <BackToHomeButton />

      <section className="">
        <div className="relative">
          <Image
            className="w-full h-36 bg-gradient-to-br bg-slate-200"
            alt="cover"
            width={1000}
            height={500}
            src={coverPhotoUrl}
          />

          <div className="absolute left-5 top-16">
            <Avatar
              className={
                "transition-all h-32 w-auto aspect-square absolute z-10"
              }
            >
              <AvatarImage src={imageUrl} />
              <AvatarFallback className="text-3xl font-bold">
                {[firstname, lastname]
                  .map((str) => {
                    return str ? str[0].toUpperCase() : "";
                  })
                  .join("")}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>

        <div className="mt-16 px-4 flex flex-col gap-2">
          <div>
            <h6>
              {firstname} {lastname}
            </h6>
            <p className="text-sm font-light gap-2 flex opacity-80">
              @{username}
              <BadgeComponent userId={user.id} privilege={user.privilege} />
            </p>
          </div>

          <p className="text-sm p-2">{info}</p>

          <div className="flex gap-4 text-sm items-center opacity-80">
            <div className="flex items-center gap-2">
              <ComponentPlaceholderIcon />
              <p>Lives in {address}</p>
            </div>
            <div className="flex items-center gap-2">
              <HandIcon />
              <p>Born {dateFormatter(birthday as string)}</p>
            </div>
            <div className="flex items-center gap-2">
              <ClockIcon />
              <p>Joined {dateFormatter(created_at)}</p>
            </div>
          </div>
        </div>
      </section>

      <EventsTabs userId={userId} />
    </section>
  );
}
