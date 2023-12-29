"use client";

import AllEvents from "@/components/EventsPage/AllEvents";
import { Badge } from "@/components/UI/Badge";
import { Button } from "@/components/UI/Button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/UI/Tabs";
import { useAppSelector } from "@/context/hooks";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function Profile() {
  const { user } = useAppSelector((state) => state.user);
  const router = useRouter();

  if (user == null) {
    router.push("/login");
    return <></>;
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
      <div>
        <Link href={"/"} className="">
          <Button variant={"link"}>
            <ChevronLeftIcon /> Back
          </Button>
        </Link>
      </div>

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
