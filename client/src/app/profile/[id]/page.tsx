import BackToHomeButton from "@/components/BackToHomeButton";
import EventsTabs from "@/components/Profile/EventsTabs";
import { Badge } from "@/components/UI/Badge";
import { Skeleton } from "@/components/UI/Skeleton";
import { supabase } from "@/lib/supabase";
import { dateFormatter } from "@/lib/utils";
import {
  ClockIcon,
  ComponentPlaceholderIcon,
  HandIcon,
} from "@radix-ui/react-icons";
import { GetServerSidePropsContext } from "next";
import React from "react";

async function fetchProfile(id: string) {
  const { data, error } = await supabase.rpc("get_user", { user_id_input: id });
  return error ? null : data[0];
}

export default async function Profile({ params }: GetServerSidePropsContext) {
  if (!params || typeof params.id !== "string") return <Skeleton />;

  const user = await fetchProfile(params.id);

  if (!user) {
    return <Skeleton />;
  }

  const {
    firstname,
    lastname,
    address,
    birthday,
    created_at,
    info,
    privilege,
    username,
  } = user;

  return (
    <section>
      <BackToHomeButton />

      <section className="relative">
        {/* cover photo */}
        <div className="w-full h-36 bg-slate-200"></div>

        <div>
          <div className="absolute top-20 left-5">
            <div className="w-auto h-28 rounded-full aspect-square bg-slate-300"></div>
          </div>

          <div className="mt-16 px-4 flex flex-col gap-2">
            <div>
              <h6>
                {firstname} {lastname}
              </h6>
              <p className="text-sm font-light gap-2 flex">
                {username}
                <Badge>{privilege}</Badge>
              </p>
            </div>

            <p className="text-sm p-2">{info}</p>

            <div className="flex gap-4 text-sm items-center opacity-80">
              <div className="flex items-center gap-2">
                <ComponentPlaceholderIcon />
                <p>Lives {address}</p>
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
        </div>
      </section>

      <EventsTabs userId={params.id} />
    </section>
  );
}
