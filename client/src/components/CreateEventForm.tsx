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
  FormDescription,
} from "./UI/Form";
import React, { useState } from "react";
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
} from "@/components/UI/Sheet";
import { Cross1Icon } from "@radix-ui/react-icons";
import { ScrollArea } from "./UI/ScrollArea";

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
    photos: z.any().optional(),
  })
  .required();

function CreateEventForm() {
  const { toast } = useToast();
  const { user } = useAppSelector((state) => state.user);

  const [selectedImages, setSelectedImages] = useState<File[]>([]);

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
        <Button
          className="w-full border-b rounded-none h-fit"
          variant="outline"
        >
          <h5 className="p-1">Create Event</h5>
        </Button>
      </SheetTrigger>
      <SheetContent className="h-auto overflow-scroll">
        <SheetHeader>
          <SheetTitle className="text-2xl">Create Event</SheetTitle>
          <SheetDescription>
            Create an event here! Make it magical!
          </SheetDescription>
        </SheetHeader>

        <section className="w-full">
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
                <FormField
                  control={eventForm.control}
                  name="photos"
                  render={({ field }) => (
                    <FormItem>
                      <FormItem>
                        <FormLabel>Info</FormLabel>
                        <FormControl>
                          <Input
                            onChange={(event) => {
                              if (event.target.files) {
                                const files = Array.from(event.target.files);
                                setSelectedImages((prevImages) => [
                                  ...prevImages,
                                  ...files,
                                ]);
                              }
                            }}
                            type="file"
                            multiple
                          />
                        </FormControl>
                        <FormMessage />
                        {selectedImages.length > 0 && (
                          <FormDescription>
                            <ScrollArea className="h-48 w-full">
                              <h6 className="p-2">Selected Images</h6>
                              <div className="p-3">
                                <div className="space-y-2">
                                  {selectedImages.map((image, index) => {
                                    return (
                                      <div
                                        className="flex gap-1 items-center justify-between"
                                        key={index}
                                      >
                                        {image.name}
                                        <Button
                                          type="button"
                                          variant={"outline"}
                                          size={"sm"}
                                          onClick={(event) => {
                                            event.stopPropagation();
                                            setSelectedImages(
                                              selectedImages.filter(
                                                (img) => img.name != image.name
                                              )
                                            );
                                          }}
                                        >
                                          <Cross1Icon />
                                        </Button>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            </ScrollArea>
                          </FormDescription>
                        )}
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
