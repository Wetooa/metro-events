import { GetAllEventsProps, StatusProps } from "@/types/supabase.interface";
import { Button } from "../UI/Button";
import { ThickArrowDownIcon } from "@radix-ui/react-icons";
import { useAppSelector } from "@/context/hooks";
import { supabase } from "@/lib/supabase";
import { toast } from "../UI/Toast/use-toast";

interface DislikeButtonProps {
  eventId: string;
  commentId?: string;
  status: StatusProps;
}

export default function DislikeButton({
  eventId,
  commentId,
  status,
}: DislikeButtonProps) {
  const { user } = useAppSelector((state) => state.user);

  async function handleDislikeEvent() {
    try {
      if (!user) throw new Error("Must be authenticated to dislike a post!");

      const { error } = await supabase.rpc("vote_post", {
        event_id_input: eventId,
        user_id_input: user?.id,
        is_like_input: false,
        comment_id_input: commentId,
      });
      if (error) throw new Error(error.message);
      toast({
        title: "Dislike Success",
        description: "Sucessfully disliked a post!",
      });
    } catch (error: any) {
      toast({ title: "Dislike Error", description: error.message });
    }
  }

  return (
    <Button
      onClick={handleDislikeEvent}
      className={`relative rounded-full aspect-square p-0`}
      variant={"ghost"}
    >
      <ThickArrowDownIcon
        className={`${status.is_voted === -1 && "text-blue-300"}`}
      />
      <p className="absolute left-10">{status.downvotes}</p>
    </Button>
  );
}
