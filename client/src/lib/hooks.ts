import { GetAllEventsFilter, GetAllEventsProps } from "@/types/supabase.interface";
import { useEffect, useState } from "react";
import { supabase } from "./supabase";

export function useFetchAllEvents(userId?: string, filter: GetAllEventsFilter = "all") {
  const [events, setEvents] = useState<GetAllEventsProps[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase.rpc("get_events", {
        user_id_input: userId,
        filter
      });

      if (error) return
      setEvents(data);
    };
    fetchEvents();
  }, [userId, filter]);


  return events;
}
