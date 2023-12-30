import { GetAllEventsProps } from "@/types/supabase.interface";
import { useEffect, useState } from "react";
import { supabase } from "./supabase";

export function useFetchAllEvents(userId?: string, onlyFollowed: boolean = false) {
  const [events, setEvents] = useState<GetAllEventsProps[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase.rpc("get_events", {
        user_id_input: userId,
        only_followed: onlyFollowed
      });
      if (error) throw new Error("Error fetching events data");
      setEvents(data);
    };
    fetchEvents();
  }, [userId]);


  return events;
}
