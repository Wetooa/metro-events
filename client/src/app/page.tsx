"use client";

import CreateEventForm from "@/components/CreateEventForm";
import AllEvents from "@/components/EventsPage/AllEvents";
import FollowedEvents from "@/components/EventsPage/FollowedEvents";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/UI/Tabs";

export default function Home() {
  return (
    <main className="w-full ">
      <CreateEventForm />

      <Tabs defaultValue="allEvents" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="allEvents">All Events</TabsTrigger>
          <TabsTrigger value="following">Following</TabsTrigger>
        </TabsList>
        <TabsContent value="allEvents">
          <AllEvents />
        </TabsContent>
        <TabsContent value="following">
          <FollowedEvents />
        </TabsContent>
      </Tabs>
    </main>
  );
}
