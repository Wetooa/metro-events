"use client";

import React from "react";
import Event from "../Event";
import { supabase } from "@/lib/supabase";
import { useFetchEvent } from "@/lib/hooks";

export default function AllEvents() {
  const events = useFetchEvent();

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
        return <Event key={event.id} {...event} />;
      })}
    </main>
  );
}
