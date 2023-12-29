"use client";

import AllEvents from "@/components/EventsPage/AllEvents";
import AccountDetails from "@/components/ProfilePage/AccountDetails";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/UI/tabs";
import { useAppSelector } from "@/context/hooks";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function Profile() {
  const { user } = useAppSelector((state) => state.user);
  const router = useRouter();

  if (!user) router.push("/login");

  return (
    <section>
      <div>
        <Link href={"/"} className="">
          back button
        </Link>
      </div>

      <AccountDetails />

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
