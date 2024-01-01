"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PrivilegeType } from "@/types/supabase.interface";
import { Badge } from "./UI/Badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/UI/AlertDialog";
import { useAppSelector } from "@/context/hooks";
import { Button } from "./UI/Button";
import { toast } from "./UI/Toast/use-toast";
import { supabase } from "@/lib/supabase";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/UI/Popover";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "./UI/Form";
import { Textarea } from "./UI/Textarea";

interface BadgeComponentProps {
  privilege: PrivilegeType;
  userId: string;
}

const joinOrganizerSchema = z
  .object({
    message: z
      .string()
      .min(2, { message: "Message must be at least 2 characters long" })
      .max(200, { message: "Title must be at most 200 characters long" }),
  })
  .required();

export default function BadgeComponent({
  privilege,
  userId,
}: Readonly<BadgeComponentProps>) {
  const { user } = useAppSelector((state) => state.user);

  const joinOrganizerForm = useForm<z.infer<typeof joinOrganizerSchema>>({
    resolver: zodResolver(joinOrganizerSchema),
    defaultValues: {
      message: "",
    },
  });

  async function handleJoinBecomeAnOrganizer(
    values: z.infer<typeof joinOrganizerSchema>
  ) {
    try {
      if (!user)
        throw new Error("Must be authenticated to become an organizer");

      const { error } = await supabase.rpc("request_to_be_organizer", {
        user_id_input: user?.id,
        message: values.message ?? "I would like to become an organizer!",
      });

      if (error) throw new Error(error.message);

      toast({
        title: "Join Organizer Request Success",
        description:
          "You have requested to be an organizer! The admins will be validating your request...",
      });
    } catch (error: any) {
      toast({
        title: "Join Organizer Request Error",
        description: error.message,
      });
    }
  }

  if (user?.id === userId && privilege === "user") {
    return (
      <AlertDialog>
        <AlertDialogTrigger>
          <Badge>{privilege}</Badge>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Upgrade to Organizer?</AlertDialogTitle>
            <AlertDialogDescription>
              You are currently a user! User&apos;s are not able to create
              events! Click continue to make a request to become an organizer!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Popover>
              <PopoverTrigger>
                <Button>Become an organizer</Button>
              </PopoverTrigger>
              <PopoverContent className="w-60">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h5 className="font-bold leading-none">Follow an event</h5>
                    <span className="text-xs font-light text-muted-foreground">
                      Send a proper message! You wanna join the meeting right?
                    </span>
                  </div>
                  <div className="grid gap-2">
                    <Form {...joinOrganizerForm}>
                      <form
                        onSubmit={joinOrganizerForm.handleSubmit(
                          handleJoinBecomeAnOrganizer
                        )}
                        className="space-y-4 mt-5 flex flex-col items-end"
                      >
                        <FormField
                          control={joinOrganizerForm.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormItem>
                                <FormLabel>Message</FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="I would like to become an organizer!"
                                    autoFocus
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            </FormItem>
                          )}
                        />

                        <AlertDialogAction>
                          <Button className="w-fit" type="submit">
                            Submit
                          </Button>
                        </AlertDialogAction>
                      </form>
                    </Form>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  return <Badge>{privilege}</Badge>;
}
