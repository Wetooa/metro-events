import { useFetchAllEvents } from "@/lib/hooks";
import { supabase } from "@/lib/supabase";
import React from "react";
import EventCard from "../EventCard";
import { useAppSelector } from "@/context/hooks";
import { Skeleton } from "../UI/Skeleton";
import { useRouter } from "next/navigation";
import NoEvents from "./NoEvents";

export default function FollowedEvents() {
  const router = useRouter();
  const { user } = useAppSelector((state) => state.user);
  const events = useFetchAllEvents(user?.id, true);

  if (!user) {
    router.push("/login");
    return <Skeleton />;
  }

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
      {events.length > 0 ? (
        <>
          {events.map((event) => {
            return <EventCard key={event.id} {...event} />;
          })}
        </>
      ) : (
        <NoEvents />
      )}
    </main>
  );
}
