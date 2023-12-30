"use client";

import React from "react";
import EventCard from "../EventCard";
import { supabase } from "@/lib/supabase";
import { useFetchAllEvents } from "@/lib/hooks";

export default function AllEvents() {
  const events = useFetchAllEvents();

  const eventChannel = supabase
    .channel("event_db_changes")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "events" },
      (payload) => {
        console.log(payload);
      }
    )
    .subscribe();

  return (
    <main>
      {events.map((event) => {
        return <EventCard key={event.id} {...event} />;
      })}
    </main>
  );
}
