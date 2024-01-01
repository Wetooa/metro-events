"use client";

import React from "react";
import { supabase } from "@/lib/supabase";
import { useFetchAllEvents } from "@/lib/hooks";
import { GetAllEventsFilter } from "@/types/supabase.interface";
import { useAppSelector } from "@/context/hooks";
import EventCard from "./EventCard";
import NoEvents from "./NoEvents";

export default function EventsPage({
  filter = "all",
  userId,
}: {
  userId?: string;
  filter?: GetAllEventsFilter;
}) {
  const { user } = useAppSelector((state) => state.user);
  const events = useFetchAllEvents(userId ?? user?.id, filter);

  // const eventChannel = supabase
  //   .channel("event_db_changes")
  //   .on(
  //     "postgres_changes",
  //     { event: "*", schema: "public", table: "events" },
  //     (payload) => {
  //       console.log(payload);
  //     }
  //   )
  //   .subscribe();

  return (
    <main>
      {events.length > 0 ? (
        events.map((event) => {
          return <EventCard key={event.id} {...event} />;
        })
      ) : (
        <NoEvents />
      )}
    </main>
  );
}
