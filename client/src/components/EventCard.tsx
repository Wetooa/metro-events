"use client";

import React, { MouseEvent, MouseEventHandler } from "react";
import { useRouter } from "next/navigation";
import { GetAllEventsProps } from "@/types/supabase.interface";
import { Avatar, AvatarFallback, AvatarImage } from "./UI/Avatar";
import {
  BookmarkIcon,
  ChatBubbleIcon,
  ThickArrowDownIcon,
  ThickArrowUpIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogDescription,
} from "@/components/UI/Dialog";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "./UI/Form";
import { useForm } from "react-hook-form";
import { Button } from "./UI/Button";
import { Textarea } from "./UI/Textarea";
import { toast } from "./UI/Toast/use-toast";
import { supabase } from "@/lib/supabase";
import { useAppSelector } from "@/context/hooks";
import { sendStatusCode } from "next/dist/server/api-utils";
import { DialogClose } from "@radix-ui/react-dialog";

interface Event extends GetAllEventsProps {}

const commentFormSchema = z
  .object({
    message: z
      .string()
      .min(5, { message: "Message must be at least 5 characters long" })
      .max(500, { message: "Message must not exceed 500 characters" }),
  })
  .required();

export default function EventCard({
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
}: Readonly<GetAllEventsProps>) {
  const router = useRouter();
  const { user } = useAppSelector((state) => state.user);

  const commentForm = useForm<z.infer<typeof commentFormSchema>>({
    resolver: zodResolver(commentFormSchema),
    defaultValues: {
      message: "",
    },
  });

  async function handleCommentOnEvent(
    values: z.infer<typeof commentFormSchema>
  ) {
    try {
      if (!user) throw new Error("User must authenticated to comment");

      const { data, error } = await supabase.rpc("comment_on_event", {
        comment: values.message,
        event_id: id,
        user_id: user?.id,
      });
      if (error) throw new Error(error.message);

      toast({
        title: "Comment Success",
        description: "Comment sent successfully!",
      });
    } catch (error: any) {
      toast({ title: "Comment Error", description: error.message });
    }
  }

  async function handleLikeEvent() {
    try {
      if (!user) throw new Error("User must authenticated to like a post!");
    } catch (error: any) {}
  }

  async function handleDislikeEvent() {
    try {
      if (!user) throw new Error("User must authenticated to dislike a post!");
    } catch (error: any) {}
  }

  return (
    <section
      // onKeyDown={() => {}}
      // onClick={() => router.push(`/event?id=${id}`)}
      className="hover:bg-black/30 transition-all border-t border-white/20 p-4 text-start cursor-pointer"
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

        <div className="flex-1">
          <div className="flex flex-col">
            <Link href={`/event?id=${id}`}>
              <h6 className="text-lg font-bold hover:underline">{title}</h6>
            </Link>
            <Link
              onClick={(event: MouseEvent) => {
                event.stopPropagation();
              }}
              className="text-sm hover:underline"
              href={`/profile/${organizer_id}`}
            >
              Organizer: {organizer_name}
            </Link>
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

          <div className="flex w-full justify-around">
            <Dialog>
              <DialogTrigger>
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

                <section>
                  <Form {...commentForm}>
                    <form
                      onSubmit={commentForm.handleSubmit(handleCommentOnEvent)}
                      className="space-y-4 mt-5"
                    >
                      <FormField
                        control={commentForm.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormItem>
                              <FormLabel>Message</FormLabel>
                              <FormControl>
                                <Textarea
                                  autoFocus
                                  placeholder="ex. This is a great event!"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          </FormItem>
                        )}
                      />
                      <DialogClose asChild>
                        <Button type="submit">Send Comment</Button>
                      </DialogClose>
                    </form>
                  </Form>
                </section>
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
          </div>
        </div>
      </div>
    </section>
  );
}
