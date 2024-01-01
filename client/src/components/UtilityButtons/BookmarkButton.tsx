"use client";

import { GetAllEventsProps } from "@/types/supabase.interface";
import { Button } from "../UI/Button";
import { BookmarkIcon } from "@radix-ui/react-icons";
import { toast } from "../UI/Toast/use-toast";
import { useAppSelector } from "@/context/hooks";
import { supabase } from "@/lib/supabase";

interface BookmarkButtonProps extends GetAllEventsProps {}

export default function BookmarkButton(event: BookmarkButtonProps) {
  const { id: eventId } = event;
  const { is_bookmarked } = event.status;
  const { user } = useAppSelector((state) => state.user);

  async function handleBookmarkEvent() {
    try {
      if (!user)
        throw new Error(
          `Must be authenticated to ${
            is_bookmarked ? "bookmark" : "unbookmark"
          } an event!`
        );
      const { error } = await supabase.rpc(
        !is_bookmarked ? "bookmark_event" : "unbookmark_event",
        { event_id_input: eventId, user_id_input: user.id }
      );
      toast({
        title: "Success",
        description: `Sucessfully ${
          is_bookmarked ? "bookmark" : "unbookmark"
        } an event!`,
      });
      if (error) throw new Error(error.message);
    } catch (error: any) {
      toast({ title: "Bookmark Error", description: error.message });
    }
  }

  return (
    <Button
      onClick={handleBookmarkEvent}
      className={`relative rounded-full aspect-square p-0`}
      variant={"ghost"}
    >
      <BookmarkIcon className={`${is_bookmarked && "text-blue-300"}`} />
    </Button>
  );
}
