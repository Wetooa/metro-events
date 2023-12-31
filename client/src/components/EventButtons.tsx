import { GetAllEventsProps } from "@/types/supabase.interface";

import { useForm } from "react-hook-form";
import { Button } from "./UI/Button";
import { Textarea } from "./UI/Textarea";
import {
  BookmarkIcon,
  ChatBubbleIcon,
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
import { supabase } from "@/lib/supabase";

interface EventButtonsProps extends GetAllEventsProps {}

export default function EventButtons(event: Readonly<EventButtonsProps>) {
  const { comments_count, is_voted, upvotes, downvotes } = event;

  // async function handleLikeEvent() {
  //   try {
  //     if (!user) throw new Error("User must authenticated to like a post!");

  //     if (is_voted && is_voted !== 1) {
  //       await supabase
  //         .from("votes")
  //         .update({ is_like: true })
  //         .eq("event_id", id)
  //         .eq("user_id", user.id);
  //     } else if (is_voted && is_voted === 1) {
  //       await supabase
  //         .from("votes")
  //         .delete()
  //         .eq("event_id", id)
  //         .eq("user_id", user.id);
  //     } else {
  //       await supabase
  //         .from("votes")
  //         .insert({ user_id: user.id, event_id: id, is_like: true });
  //     }
  //   } catch (error: any) {
  //     toast({ title: "Like Error", description: error.message });
  //   }
  // }

  async function handleDislikeEvent() {
    try {
      // if (!user) throw new Error("User must authenticated to dislike a post!");
    } catch (error: any) {
      // toast({ title: "Like Error", description: error.message });
    }
  }

  return (
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
        // onClick={handleLikeEvent}
        className={`relative rounded-full aspect-square p-0`}
        variant={"ghost"}
      >
        <ThickArrowUpIcon className={`${is_voted === 1 && "text-blue-300"}`} />
        <p className="absolute left-10">{upvotes}</p>
      </Button>
      <Button
        onClick={handleDislikeEvent}
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
  );
}
