"use client";

import React from "react";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/UI/Tabs";
import FollowedEvents from "../EventsPage/FollowedEvents";

export default function EventsTabs() {
  return (
    <Tabs defaultValue="following" className="w-full mt-6">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="following">Following</TabsTrigger>
        <TabsTrigger value="comments">Comments</TabsTrigger>
        <TabsTrigger value="links">Likes</TabsTrigger>
      </TabsList>
      <TabsContent value="following">
        <FollowedEvents />
      </TabsContent>
      <TabsContent value="comments">
        <FollowedEvents />
      </TabsContent>
      <TabsContent value="likes">
        <FollowedEvents />
      </TabsContent>
    </Tabs>
  );
}
