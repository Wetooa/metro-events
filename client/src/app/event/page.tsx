"use client";

import BackToHomeButton from "@/components/BackToHomeButton";
import EventCard from "@/components/EventCard";
import { Avatar } from "@/components/UI/Avatar";
import { Skeleton } from "@/components/UI/Skeleton";
import { toast } from "@/components/UI/Toast/use-toast";
import { useAppSelector } from "@/context/hooks";
import { supabase } from "@/lib/supabase";
import {
  CommentProps,
  EventMembersProps,
  EventProps,
} from "@/types/supabase.interface";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function useFetchEvent(eventId: string) {
  const { user } = useAppSelector((state) => state.user);

  const [event, setEvent] = useState<EventProps>();
  const [members, setMembers] = useState<EventMembersProps>();
  const [comments, setComments] = useState<CommentProps>();

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const { data: eventData, error: eventError } = await supabase.rpc(
          "get_event",
          { event_id_input: eventId, user_id_input: user?.id }
        );
        if (eventError) throw new Error();
        setEvent(eventData[0]);
      } catch (error: any) {}
    };

    fetchEventData();
  }, [eventId, user?.id]);

  return event;
}

export default function Event() {
  const router = useRouter();
  const eventId = useSearchParams().get("id");
  const event = useFetchEvent(eventId as string);

  if (!event) {
    return <Skeleton />;
  }

  const {
    created_at,
    date,
    downvotes,
    upvotes,
    id,
    info,
    is_cancelled,
    is_voted,
    location,
    organizer_id,
    organizer_name,
    title,
  } = event;

  return (
    <section>
      <BackToHomeButton />

      <section className="hover:bg-black/30 transition-all border-t border-white/20 p-4 text-start">
        <div className="flex gap-2">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex flex-col">
              <h6 className="text-lg font-bold">{title}</h6>
              <p className="text-sm">Organizer: {organizer_name}</p>
              <p className="text-sm">
                When: {new Date(date).toLocaleDateString()}
              </p>
              <p className="text-sm">Where: {location}</p>
              <p className="text-md">{info}</p>
            </div>

            <div className="w-full h-20 px-6 mt-2">
              {/* tmp img */}
              <div className="bg-slate-200 w-full h-20 rounded-md"></div>
            </div>

            <div className="flex w-full justify-around"></div>
          </div>
        </div>
      </section>
    </section>
  );
}
