"use client";

import React, { useEffect, useState } from "react";
import Event from "../Event";
import { supabase } from "@/utils/supabase";
import { useAppSelector } from "@/context/hooks";
import { GetAllEventsProps } from "@/types/supabase.interface";

function useFetchEvent() {
  const { user } = useAppSelector((state) => state.user);
  const [events, setEvents] = useState<GetAllEventsProps[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase.rpc("get_events", {
        user_id_input: user?.id,
      });
      if (error) throw new Error("Error fetching events data");
      setEvents(data);
    };
    fetchEvents();
  }, [user]);

  return events;
}

export default function Main() {
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
