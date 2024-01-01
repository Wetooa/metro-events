import { NotificationsProps } from "@/types/supabase.interface";
import { Button } from "../UI/Button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../UI/Tooltip";
import { CheckIcon } from "@radix-ui/react-icons";
import { dateFormatter } from "@/lib/utils";
import moment from "moment";
import Link from "next/link";

interface NotificationComponentProps extends NotificationsProps {}

export default function NotificationComponent({
  created_at,
  is_read,
  message,
  title,
  event_id,
}: NotificationComponentProps) {
  return (
    <div className="border-b border-white/20 flex p-3 justify-between items-center">
      <div className="space-y-1">
        <Link className="hover:underline" href={`/event?id=${event_id}`}>
          <h5>{title}</h5>
        </Link>
        <p className="text-xs font-light opacity-80">
          {moment(created_at).calendar()} - {dateFormatter(created_at ?? "")}
        </p>
        <p className="text-sm">{message}</p>
      </div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant={"outline"}>
              <CheckIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent sideOffset={-100}>
            <p className="text-xs">Mark as Read</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
