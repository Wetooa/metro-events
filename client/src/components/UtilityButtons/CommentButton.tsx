"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogDescription,
  DialogClose,
} from "@/components/UI/Dialog";
import { ChatBubbleIcon } from "@radix-ui/react-icons";
import { supabase } from "@/lib/supabase";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/UI/Form";
import { Textarea } from "@/components/UI/Textarea";
import { useAppSelector } from "@/context/hooks";
import { toast } from "@/components/UI/Toast/use-toast";
import { Button } from "@/components/UI/Button";
import CommentForm from "../CommentForm";
import { StatusProps } from "@/types/supabase.interface";

interface CommentButtonProps {
  eventId: string;
  commentId?: string;
  status: StatusProps;
}

export default function CommentButton({
  eventId,
  commentId,
  status,
}: CommentButtonProps) {
  const { user } = useAppSelector((state) => state.user);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className={`relative rounded-full aspect-square p-0`}
          variant={"ghost"}
        >
          <ChatBubbleIcon />
          <p className="absolute left-10">{status.comments_count}</p>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Comment</DialogTitle>
          <DialogDescription>
            Comment your thoughts about this event!
          </DialogDescription>
        </DialogHeader>
        <CommentForm eventId={eventId} commentId={commentId} />
      </DialogContent>
    </Dialog>
  );
}
