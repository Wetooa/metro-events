import BackToHomeButton from "@/components/BackToHomeButton";
import AllEvents from "@/components/EventsPage/AllEvents";
import { Badge } from "@/components/UI/Badge";
import { Skeleton } from "@/components/UI/Skeleton";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/UI/Tabs";
import { supabase } from "@/lib/supabase";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";

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
    email,
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
          {/* profile photo */}
          <div className="absolute top-20 left-5">
            <div className="w-auto h-28 rounded-full aspect-square bg-slate-300"></div>
          </div>

          <div className="mt-16">
            <h6>
              {firstname} {lastname}
            </h6>
            <p>@{username}</p>
            <Badge>{privilege}</Badge>
            <p>{info}</p>

            <div className="flex flex-col">
              <p>{address}</p>
              <p>{birthday}</p>
              <p>{created_at}</p>
            </div>
          </div>
        </div>
      </section>

      <Tabs defaultValue="following" className="w-full">
        <TabsList>
          <TabsTrigger value="following">Following</TabsTrigger>
          <TabsTrigger value="comments">Comments</TabsTrigger>
          <TabsTrigger value="links">Likes</TabsTrigger>
        </TabsList>
        <TabsContent value="following">
          {/* main shet */}
          <AllEvents />
        </TabsContent>
        <TabsContent value="comments">
          {/* main shet */}
          <AllEvents />
        </TabsContent>
        <TabsContent value="likes">
          {/* main shet */}
          <AllEvents />
        </TabsContent>
      </Tabs>
    </section>
  );
}
