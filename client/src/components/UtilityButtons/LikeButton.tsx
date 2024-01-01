import { GetAllEventsProps, StatusProps } from "@/types/supabase.interface";
import { Button } from "../UI/Button";
import { ThickArrowUpIcon } from "@radix-ui/react-icons";
import { supabase } from "@/lib/supabase";
import { toast } from "../UI/Toast/use-toast";
import { useAppSelector } from "@/context/hooks";

interface LikeButtonProps {
  eventId: string;
  commentId?: string;
  status: StatusProps;
}

export default function LikeButton({
  eventId,
  commentId,
  status,
}: Readonly<LikeButtonProps>) {
  const { user } = useAppSelector((state) => state.user);

  async function handleLikeEvent() {
    try {
      if (!user) throw new Error("Must be authenticated to like a post!");
      const { error } = await supabase.rpc("vote_post", {
        event_id_input: eventId,
        user_id_input: user?.id,
        is_like_input: true,
        comment_id_input: commentId,
      });
      if (error) throw new Error(error.message);
      toast({
        title: "Like Success",
        description: "Sucessfully liked a post!",
      });
    } catch (error: any) {
      toast({ title: "Like Error", description: error.message });
    }
  }

  return (
    <Button
      onClick={handleLikeEvent}
      className={`relative rounded-full aspect-square p-0`}
      variant={"ghost"}
    >
      <ThickArrowUpIcon
        className={`${status.is_voted === 1 && "text-blue-300"}`}
      />
      <p className="absolute left-10">{status.upvotes}</p>
    </Button>
  );
}
