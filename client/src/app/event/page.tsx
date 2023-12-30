"use client";

import BackToHomeButton from "@/components/BackToHomeButton";
import CommentForm from "@/components/CommentForm";
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

function useFetchEvent(eventId: string) {
  const { user } = useAppSelector((state) => state.user);

  const [event, setEvent] = useState<EventProps>();
  const [members, setMembers] = useState<EventMembersProps>();
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
          { event_id_input: eventId }
        );

        if (eventError || commentsError) throw new Error();

        setEvent(eventData[0]);
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
          <CommentForm {...event} />
        </div>
        <Separator />
        <div className="">
          {comments?.map((comment) => {
            return <CommentComponent key={comment.id} {...comment} />;
          })}
        </div>
      </section>

      {/* <Drawer>
        <DrawerTrigger>
          <Button className="w-full">Reply</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Are you sure absolutely sure?</DrawerTitle>
            <DrawerDescription>This action cannot be undone.</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer> */}
    </section>
  );
}
