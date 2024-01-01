"use client";

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
import { Badge } from "./UI/Badge";
import { dateFormatter } from "@/lib/utils";
import CommentButton from "./UtilityButtons/CommentButton";
import LikeButton from "./UtilityButtons/LikeButton";
import DislikeButton from "./UtilityButtons/DislikeButton";
import BookmarkButton from "./UtilityButtons/BookmarkButton";

export default function EventCard(event: Readonly<GetAllEventsProps>) {
  const router = useRouter();
  const { user } = useAppSelector((state) => state.user);
  const { id, title, location, info, date, organizer_id, organizer, status } =
    event;
  const { organizer_name, organizer_privilege } = organizer;

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
