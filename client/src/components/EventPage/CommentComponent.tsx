import { RecursiveCommentsProps } from "@/types/supabase.interface";
import Link from "next/link";
import { Badge } from "../UI/Badge";
import { Avatar, AvatarFallback, AvatarImage } from "../UI/Avatar";
import { useRouter } from "next/navigation";
import { dateFormatter } from "@/lib/utils";

interface CommentComponentProps extends RecursiveCommentsProps {}

export default function CommentComponent({
  comment,
  commenter_name,
  created_at,
  comments,
  user_id,
  commenter_privilege,
}: CommentComponentProps) {
  const router = useRouter();

  return (
    <div className="border-b border-white/20 p-2">
      <div className="flex gap-2 p-1">
        <div>
          <Avatar
            className="hover:opacity-80 transition-all"
            onClick={(event) => {
              router.push(`/profile/${user_id}`);
            }}
          >
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>

        <div className="flex flex-col gap-1">
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
      </div>
      <div></div>
    </div>
  );
}
