"use client";

import { supabase } from "@/lib/supabase";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogClose } from "@/components/UI/Dialog";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "./UI/Form";
import { Textarea } from "./UI/Textarea";
import { useAppSelector } from "@/context/hooks";
import { toast } from "./UI/Toast/use-toast";
import { GetAllEventsProps } from "@/types/supabase.interface";
import { Button } from "./UI/Button";

const commentFormSchema = z
  .object({
    message: z
      .string()
      .min(5, { message: "Message must be at least 5 characters long" })
      .max(500, { message: "Message must not exceed 500 characters" }),
  })
  .required();

export default function CommentForm({ id }: GetAllEventsProps) {
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

  return (
    <section className="z-10">
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
          <Button type="submit">Send Comment</Button>
        </form>
      </Form>
    </section>
  );
}
