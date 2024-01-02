import { RecursiveCommentsProps } from "@/types/supabase.interface";
import Link from "next/link";
import { Badge } from "../UI/Badge";
import { Avatar, AvatarFallback, AvatarImage } from "../UI/Avatar";
import { useRouter } from "next/navigation";
import { dateFormatter } from "@/lib/utils";
import CommentButton from "../UtilityButtons/CommentButton";
import LikeButton from "../UtilityButtons/LikeButton";
import DislikeButton from "../UtilityButtons/DislikeButton";
import AvatarComponent from "../AvatarComponent";

interface CommentComponentProps extends RecursiveCommentsProps {}

export default function CommentComponent({
  comment,
  created_at,
  comments,
  id,
  user_id,
  commenter,
  status,
  event_id,
  comment_id,
}: CommentComponentProps) {
  const router = useRouter();
  const { username: commenter_name, privilege: commenter_privilege } =
    commenter;
  const { comments_count } = status;

  return (
    <div className="border-b border-white/20 p-2">
      <div className="flex gap-2 p-1">
        <div>
          <AvatarComponent userId={user_id} fallbackText={[commenter_name]} />
        </div>

        <div className="flex flex-col gap-1 w-full">
          <div>
            <div className="flex">
              <Link
                href={`/profile/${user_id}`}
                className="flex gap-2 hover:underline"
              >
                <span className="text-xl font-bold">{commenter_name}</span>
              </Link>
              <Badge className="scale-75">{commenter_privilege}</Badge>
            </div>
            <p className="text-xs font-thin">{dateFormatter(created_at)}</p>
            <p>{comment}</p>
          </div>
          <div className="w-full flex justify-around">
            <CommentButton eventId={event_id} commentId={id} status={status} />
            <LikeButton eventId={event_id} commentId={id} status={status} />
            <DislikeButton eventId={event_id} commentId={id} status={status} />
          </div>
        </div>
      </div>
    </div>
  );
}
