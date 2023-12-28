"use client";

import React, { FormEvent, useState } from "react";
import Textarea from "./UI/Textarea";
import { formEventToObject } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import { useAppSelector } from "@/context/hooks";
import { useToast } from "./UI/Toast/use-toast";
import { Input } from "./UI/Input";
import { Button } from "./UI/Button";
import { DatePicker } from "./UI/DatePicker";

function CreateEventForm() {
  const { toast } = useToast();
  const { user } = useAppSelector((state) => state.user);
  const [isCreatingEvent, setIsCreatingEvent] = useState(false);

  async function handleCreateEvent(event: FormEvent) {
    event.preventDefault();
    const inputs = formEventToObject(event);

    try {
      if (!user) throw new Error("Must be signed in to create an event!");
      if (user.privilege == "user")
        throw new Error("User cannot create an event!");

      await supabase.rpc("create_event", { ...inputs, organizer_id: user.id });
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
    <section className="w-full ">
      <div className={`p-2  transition-all ${!isCreatingEvent && "hidden"}`}>
        <h5>Create An Event</h5>

        <form onSubmit={handleCreateEvent} action="">
          <Input name="title" placeholder="ex. Hiking" />
          {/* <Input title="Date" name="date" type="date" /> */}
          <DatePicker />
          <Input name="location" placeholder="ex. Mt. Kammungay" type="" />
          <Textarea name="info" placeholder="ex. A hike to the woods" />

          <Button type="submit">Create Event</Button>
        </form>
      </div>

      <button
        onClick={() => setIsCreatingEvent(!isCreatingEvent)}
        className="w-full text-center h-8 hover:opacity-90 transition-all focus:outline-none border border-white/10"
      >
        Create Event (make an icon later)
      </button>
    </section>
  );
}

export default CreateEventForm;
