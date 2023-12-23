"use client";

import React from "react";
import Button from "./UI/Button";

import { FaShareSquare, FaComment } from "react-icons/fa";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { useRouter } from "next/navigation";

export default function Event() {
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
    },
    {
      icon: <AiFillDislike />,
      fc: handleDislikeEvent,
    },
  ];

  return (
    <section
      onKeyDown={() => {}}
      onClick={() => router.push(`/event?id=${0}`)}
      className="hover:bg-black/30 transition-all border-t border-white/20 p-4 text-start"
    >
      <h6 className="">Event Title</h6>
      <p className="text-sm">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Error fugiat ad
        ut. Dolore, incidunt sed hic saepe quaerat at accusantium ullam vitae
        officiis. Delectus reprehenderit dicta ratione fugiat. Quasi, mollitia.
      </p>

      <div className="w-full h-20 px-6 mt-2">
        {/* tmp img */}
        <div className="bg-slate-200 w-full h-20 rounded-md"></div>
      </div>

      <div className="flex w-full justify-around">
        {eventButtons.map(({ icon, fc }, index) => {
          return (
            <Button
              key={index}
              className="rounded-full w-fit h-fit p-2"
              variant={"subtle"}
              isLoading={false}
              onClick={(event) => {
                event.stopPropagation();
                fc();
              }}
            >
              {icon}
            </Button>
          );
        })}
      </div>
    </section>
  );
}
