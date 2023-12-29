import { useAppSelector } from "@/context/hooks";
import { GetAllEventsProps } from "@/types/supabase.interface";
import { useEffect, useState } from "react";
import { supabase } from "./supabase";

export function useFetchEvent() {
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
