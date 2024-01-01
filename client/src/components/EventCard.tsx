"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { MouseEvent } from "react";
import { useRouter } from "next/navigation";
import { GetAllEventsProps } from "@/types/supabase.interface";
import { Avatar, AvatarFallback, AvatarImage } from "./UI/Avatar";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/UI/DropdownMenu";
import { useAppSelector } from "@/context/hooks";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { dateFormatter } from "@/lib/utils";
import CommentButton from "./UtilityButtons/CommentButton";
import LikeButton from "./UtilityButtons/LikeButton";
import DislikeButton from "./UtilityButtons/DislikeButton";
import BookmarkButton from "./UtilityButtons/BookmarkButton";
import { Button } from "./UI/Button";
import BadgeComponent from "./BadgeComponent";
import { toast } from "./UI/Toast/use-toast";
import { supabase } from "@/lib/supabase";
import { Popover, PopoverContent, PopoverTrigger } from "./UI/Popover";
import { Textarea } from "./UI/Textarea";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "./UI/Form";
import AvatarComponent from "./AvatarComponent";

const followEventSchema = z
  .object({
    message: z
      .string()
      .min(2, { message: "Message must be at least 2 characters long" })
      .max(200, { message: "Title must be at most 200 characters long" }),
  })
  .required();

export default function EventCard(event: Readonly<GetAllEventsProps>) {
  const router = useRouter();
  const { user } = useAppSelector((state) => state.user);
  const { id, title, location, info, date, organizer_id, organizer, status } =
    event;
  const { username, privilege } = organizer;

  const followEventForm = useForm<z.infer<typeof followEventSchema>>({
    resolver: zodResolver(followEventSchema),
    defaultValues: {
      message: "",
    },
  });

  async function handleUnfollowEvent() {}

  async function handleFollowEvent(values: z.infer<typeof followEventSchema>) {
    try {
      if (!user)
        throw new Error("User must be authenticated to follow an event!");

      const { data, error } = await supabase.rpc("request_to_join_event", {
        event_id_input: id,
        user_id_input: user.id,
        message: values.message ?? "I would like to join this event!",
      });

      if (error) throw new Error(error.message);

      toast({
        title: "Follow Success",
        description: "Request sent successfully!",
      });
    } catch (error: any) {
      toast({ title: "Follow Error", description: error.message });
    }
  }

  return (
    <section className="hover:bg-black/30 transition-all border-b border-white/20 p-4 pr-6">
      <div className="flex gap-2">
        <AvatarComponent
          fallbackText={[organizer.username]}
          userId={organizer.id}
        />
        <div className="flex-1 space-y-3">
          <div className="flex flex-col gap-1">
            <div className="flex justify-between">
              <Link href={`/event?id=${id}`}>
                <h5 className="hover:underline">{title}</h5>
              </Link>
              <div className="space-x-4">
                {user && (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        className="rounded-full"
                        variant={
                          status.follow_status === "followed"
                            ? "outline"
                            : "default"
                        }
                      >
                        {status.follow_status[0].toUpperCase() +
                          status.follow_status.substring(1)}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-60">
                      <div className="grid gap-4">
                        <div className="space-y-2">
                          <h5 className="font-bold leading-none">
                            Follow an event
                          </h5>
                          <p className="text-xs font-light text-muted-foreground">
                            Send a proper message! You wanna join the meeting
                            right?
                          </p>
                        </div>
                        <div className="grid gap-2">
                          <Form {...followEventForm}>
                            <form
                              onSubmit={followEventForm.handleSubmit(
                                handleFollowEvent
                              )}
                              className="space-y-4 mt-5 flex flex-col items-end"
                            >
                              <FormField
                                control={followEventForm.control}
                                name="message"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormItem>
                                      <FormLabel>Message</FormLabel>
                                      <FormControl>
                                        <Textarea
                                          placeholder="I would like to join this event!"
                                          autoFocus
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  </FormItem>
                                )}
                              />
                              <Button className="w-fit" type="submit">
                                Submit
                              </Button>
                            </form>
                          </Form>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                )}

                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <DotsHorizontalIcon className="scale-125 rounded-full aspect-square opacity-80" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Event Settings</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuItem>Team</DropdownMenuItem>
                    <DropdownMenuItem>Subscription</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div className="flex gap-2">
              <Link
                onClick={(event: MouseEvent) => {
                  event.stopPropagation();
                }}
                className="text-sm hover:underline "
                href={`/profile/${organizer_id}`}
              >
                <p className="text-md font-light">
                  <b>Organizer: </b>
                  {username}
                </p>
              </Link>
              <BadgeComponent userId={organizer_id} privilege={privilege} />
            </div>
            <div className="opacity-80 text-sm">
              <p className="">
                <b>When:</b> {dateFormatter(date)} - @{" "}
                {new Date(date).toLocaleTimeString("en-us", {
                  hour: "numeric",
                  minute: "numeric",
                })}
              </p>
              <p className="">
                <b>Where: </b>
                {location}
              </p>
            </div>
            <p className="text-sm">{info}</p>
          </div>
          <div className="w-full h-32 mt-2">
            {/* tmp img */}
            <div className="bg-slate-200 w-full h-full rounded-md"></div>
          </div>

          <section className="flex w-full justify-around">
            <CommentButton eventId={id} status={status} />
            <LikeButton eventId={id} status={status} />
            <DislikeButton eventId={id} status={status} />
            <BookmarkButton {...event} />
          </section>
        </div>
      </div>
    </section>
  );
}
