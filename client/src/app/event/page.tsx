"use client";

import BackToHomeButton from "@/components/BackToHomeButton";
import EventCard from "@/components/EventCard";
import { Button } from "@/components/UI/Button";
import { Skeleton } from "@/components/UI/Skeleton";
import { Textarea } from "@/components/UI/Textarea";
import { toast } from "@/components/UI/Toast/use-toast";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/UI/Drawer";
import { useAppSelector } from "@/context/hooks";
import { supabase } from "@/lib/supabase";
import {
  CommentProps,
  EventMembersProps,
  EventProps,
  RecursiveCommentsProps,
} from "@/types/supabase.interface";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import CommentComponent from "@/components/EventPage/CommentComponent";
import { Separator } from "@/components/UI/Separator";
import CommentForm from "@/components/CommentForm";

function useFetchEvent(eventId: string) {
  const { user } = useAppSelector((state) => state.user);

  const [event, setEvent] = useState<EventProps>();
  const [comments, setComments] = useState<RecursiveCommentsProps[]>();

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const { data: eventData, error: eventError } = await supabase.rpc(
          "get_event",
          { event_id_input: eventId, user_id_input: user?.id }
        );
        const { data: commentsData, error: commentsError } = await supabase.rpc(
          "get_event_comments",
          { event_id_input: eventId, user_id_input: user?.id }
        );

        if (eventError || commentsError) throw new Error();

        setEvent(eventData);
        setComments(
          commentsData.map((comment) => {
            return { ...comment, comments: [] };
          })
        );
      } catch (error: any) {}
    };

    fetchEventData();
  }, [eventId, user?.id]);

  return { event, comments };
}

export default function Event() {
  const router = useRouter();
  const eventId = useSearchParams().get("id");
  const { event, comments } = useFetchEvent(eventId as string);

  if (!event) {
    return <Skeleton />;
  }

  return (
    <section className="flex flex-col gap-4">
      <BackToHomeButton />

      <EventCard {...event} />

      <section className="">
        <div className="px-5 mb-6">
          <CommentForm eventId={eventId ?? ""} />
        </div>
        <Separator />
        <div className="">
          {comments?.map((comment) => {
            return <CommentComponent key={comment.id} {...comment} />;
          })}
        </div>
      </section>
    </section>
  );
}
