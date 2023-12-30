"use client";

import React, { MouseEvent, MouseEventHandler } from "react";
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
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "./UI/Button";
import { Textarea } from "./UI/Textarea";
import { toast } from "./UI/Toast/use-toast";
import { supabase } from "@/lib/supabase";
import { useAppSelector } from "@/context/hooks";

import {
  BookmarkIcon,
  ChatBubbleIcon,
  DotsHorizontalIcon,
  ThickArrowDownIcon,
  ThickArrowUpIcon,
} from "@radix-ui/react-icons";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogDescription,
  DialogClose,
} from "@/components/UI/Dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "./UI/Form";
import { Separator } from "./UI/Separator";
import CommentForm from "./CommentForm";
import { AspectRatio } from "./UI/Aspect-ratio";
import { Badge } from "./UI/Badge";

export default function EventCard(event: Readonly<GetAllEventsProps>) {
  const router = useRouter();
  const { user } = useAppSelector((state) => state.user);
  const {
    id,
    title,
    location,
    info,
    date,
    upvotes,
    downvotes,
    is_voted,
    organizer_id,
    comments_count,
    organizer_name,
    organizer_privilege,
  } = event;

  async function handleLikeEvent() {
    try {
      if (!user) throw new Error("User must authenticated to like a post!");

      if (is_voted && is_voted !== 1) {
        await supabase
          .from("votes")
          .update({ is_like: true })
          .eq("event_id", id)
          .eq("user_id", user.id);
      } else if (is_voted && is_voted === 1) {
        await supabase
          .from("votes")
          .delete()
          .eq("event_id", id)
          .eq("user_id", user.id);
      } else {
        await supabase
          .from("votes")
          .insert({ user_id: user.id, event_id: id, is_like: true });
      }
    } catch (error: any) {
      toast({ title: "Like Error", description: error.message });
    }
  }

  async function handleDislikeEvent() {
    try {
      if (!user) throw new Error("User must authenticated to dislike a post!");
    } catch (error: any) {
      toast({ title: "Like Error", description: error.message });
    }
  }

  return (
    <section
      // onKeyDown={() => {}}
      // onClick={() => router.push(`/event?id=${id}`)}
      className="hover:bg-black/30 transition-all border-b border-white/20 p-4 "
    >
      <div className="flex gap-2">
        <Avatar
          className="hover:opacity-80 transition-all"
          onClick={(event) => {
            event.stopPropagation();
            router.push(`/profile/${organizer_id}`);
          }}
        >
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <div className="flex-1 space-y-3">
          <div className="flex flex-col gap-1">
            <div className="flex justify-between">
              <Link href={`/event?id=${id}`}>
                <h5 className="hover:underline">{title}</h5>
              </Link>
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <DotsHorizontalIcon className="scale-125 rounded-full aspect-square opacity-80" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
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
                  {organizer_name}
                </p>
              </Link>
              <Badge className="text-xs">{organizer_privilege}</Badge>
            </div>
            <div className="opacity-80 text-sm">
              <p className="">
                <b>When:</b> {new Date(date).toLocaleDateString()} @
                {new Date(date).toLocaleTimeString()}
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
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  className={`relative rounded-full aspect-square p-0`}
                  variant={"ghost"}
                >
                  <ChatBubbleIcon />
                  <p className="absolute left-10">{comments_count}</p>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Comment</DialogTitle>
                  <DialogDescription>
                    Comment your thoughts about this event!
                  </DialogDescription>
                </DialogHeader>
                <CommentForm {...event} />
              </DialogContent>
            </Dialog>

            <Button
              onClick={handleLikeEvent}
              className={`relative rounded-full aspect-square p-0`}
              variant={"ghost"}
            >
              <ThickArrowUpIcon
                className={`${is_voted === 1 && "text-blue-300"}`}
              />
              <p className="absolute left-10">{upvotes}</p>
            </Button>
            <Button
              className={`relative rounded-full aspect-square p-0`}
              variant={"ghost"}
            >
              <ThickArrowDownIcon
                className={`${is_voted === -1 && "text-blue-300"}`}
              />
              <p className="absolute left-10">{downvotes}</p>
            </Button>

            <Button
              className={`relative rounded-full aspect-square p-0`}
              variant={"ghost"}
            >
              <BookmarkIcon className={`${false && "text-blue-300"}`} />
            </Button>
          </section>
        </div>
      </div>
    </section>
  );
}
