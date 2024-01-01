"use client";

import React from "react";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/UI/Tabs";
import EventsPage from "../EventsPage";

interface EventsTabsProps {
  userId?: string;
}

export default function EventsTabs({ userId }: EventsTabsProps) {
  return (
    <Tabs defaultValue="following" className="w-full mt-6">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="following">Following</TabsTrigger>
        <TabsTrigger value="comments">Comments</TabsTrigger>
        <TabsTrigger value="likes">Likes</TabsTrigger>
        <TabsTrigger value="dislikes">Dislikes</TabsTrigger>
      </TabsList>
      <TabsContent value="following">
        <EventsPage userId={userId} filter="followed" />
      </TabsContent>
      <TabsContent value="comments">
        <EventsPage userId={userId} filter="commented" />
      </TabsContent>
      <TabsContent value="likes">
        <EventsPage userId={userId} filter="liked" />
      </TabsContent>
      <TabsContent value="dislikes">
        <EventsPage userId={userId} filter="disliked" />
      </TabsContent>
    </Tabs>
  );
}
