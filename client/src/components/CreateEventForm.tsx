"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "./UI/Form";
import React from "react";
import { supabase } from "@/lib/supabase";
import { useAppSelector } from "@/context/hooks";
import { useToast } from "./UI/Toast/use-toast";
import { Input } from "./UI/Input";
import { Textarea } from "./UI/Textarea";
import { useForm } from "react-hook-form";
import { Button } from "@/components/UI/Button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/UI/Sheet";

const eventFormSchema = z
  .object({
    title: z
      .string()
      .min(2, { message: "Title must be at least 2 characters long" })
      .max(25, { message: "Title must be at most 25 characters long" }),
    date: z.string(),
    time: z.string(),
    location: z
      .string()
      .min(2, { message: "Location must be at least 2 characters long" })
      .max(50, { message: "Location must be at most 50 characters long" }),
    info: z
      .string()
      .min(5, { message: "Info must be at least 5 characters long" })
      .max(500, { message: "Info must not exceed 500 word limit" }),
  })
  .required();

function CreateEventForm() {
  const { toast } = useToast();
  const { user } = useAppSelector((state) => state.user);

  const eventForm = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      title: "",
      date: "",
      time: "",
      location: "",
      info: "",
    },
  });

  async function handleCreateEvent(values: z.infer<typeof eventFormSchema>) {
    try {
      if (!user) throw new Error("Must be signed in to create an event!");
      if (user.privilege == "user")
        throw new Error("User cannot create an event!");

      const { time, ...inputs } = {
        ...values,
        date: new Date(values.date + "T" + values.time).toUTCString(),
      };
      console.log(inputs);

      await supabase.rpc("create_event", {
        ...inputs,
        organizer_id: user.id,
      });
      toast({
        title: "Success!",
        description: "Event was successfully created!",
      });
    } catch (error: any) {
      toast({
        title: "Error!",
        description: error.message,
      });
    }
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Create Event</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create Event</SheetTitle>
          <SheetDescription>
            Create an event here! Make it magical!
          </SheetDescription>
        </SheetHeader>

        <section className="w-full ">
          <div className={`p-2  transition-all`}>
            <Form {...eventForm}>
              <form
                onSubmit={eventForm.handleSubmit(handleCreateEvent)}
                className="space-y-4 mt-5"
              >
                <FormField
                  control={eventForm.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input
                            autoFocus
                            placeholder="ex. Hiking"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </FormItem>
                  )}
                />
                <FormField
                  control={eventForm.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormItem>
                        <FormLabel>Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </FormItem>
                  )}
                />
                <FormField
                  control={eventForm.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem>
                      <FormItem>
                        <FormLabel>Time</FormLabel>
                        <FormControl>
                          <Input type="time" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </FormItem>
                  )}
                />
                <FormField
                  control={eventForm.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input placeholder="ex. Mt. Kammunggay" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </FormItem>
                  )}
                />
                <FormField
                  control={eventForm.control}
                  name="info"
                  render={({ field }) => (
                    <FormItem>
                      <FormItem>
                        <FormLabel>Info</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="ex. A trip to the woods"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </FormItem>
                  )}
                />
                <Button type="submit">Create Event</Button>
              </form>
            </Form>
          </div>
        </section>
        <SheetFooter>
          {/* <SheetClose asChild>
            <Button type="button" variant={"destructive"}>
              Cancel
            </Button>
          </SheetClose> */}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default CreateEventForm;
