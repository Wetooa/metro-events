"use client";

import React, { MouseEvent } from "react";

import { FaShareSquare, FaComment } from "react-icons/fa";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { GetAllEventsProps } from "@/types/supabase.interface";
import { Button } from "./UI/Button";

interface Event extends GetAllEventsProps {}

export default function Event({
  title,
  location,
  info,
  date,
  upvotes,
  downvotes,
  is_voted,
  organizer_id,
  organizer_name,
}: GetAllEventsProps) {
  const router = useRouter();

  function handleShareEvent() {}

  function handleLikeEvent() {}

  function handleDislikeEvent() {}

  function handleCommentOnEvent() {}

  const eventButtons = [
    {
      icon: <FaShareSquare />,
      fc: handleShareEvent,
    },
    {
      icon: <FaComment />,
      fc: handleCommentOnEvent,
    },
    {
      icon: <AiFillLike />,
      fc: handleLikeEvent,
      text: upvotes,
    },
    {
      icon: <AiFillDislike />,
      fc: handleDislikeEvent,
      text: downvotes,
    },
  ];

  return (
    <section
      onKeyDown={() => {}}
      onClick={() => router.push(`/event?id=${0}`)}
      className="hover:bg-black/30 transition-all border-t border-white/20 p-4 text-start"
    >
      <div className="flex flex-col">
        <h6 className="text-lg font-bold">{title}</h6>
        <p className="text-sm">Organizer: {organizer_name}</p>
        <p className="text-sm">When: {date}</p>
        <p className="text-sm">Where: {location}</p>
        <p className="text-md">{info}</p>
      </div>

      <div className="w-full h-20 px-6 mt-2">
        {/* tmp img */}
        <div className="bg-slate-200 w-full h-20 rounded-md"></div>
      </div>

      <div className="flex w-full justify-around">
        {eventButtons.map(({ icon, fc, text }, index) => {
          return (
            <Button
              key={index}
              className="rounded-full w-fit h-fit p-2"
              variant={"default"}
              onClick={(event: MouseEvent) => {
                event.stopPropagation();
                fc();
              }}
            >
              {icon}
              {text}
            </Button>
          );
        })}
      </div>
    </section>
  );
}
