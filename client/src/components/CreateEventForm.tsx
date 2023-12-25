"use client";

import React, { FormEvent, useState } from "react";
import Input from "./UI/Input";
import Textarea from "./UI/Textarea";
import Button from "./UI/Button";
import { formEventToObject, handleAsyncFunction } from "@/utils/utils";
import { supabase } from "@/utils/supabase";
import { useAppSelector } from "@/context/hooks";

function CreateEventForm() {
  const { user } = useAppSelector((state) => state.user);
  const [isCreatingEvent, setIsCreatingEvent] = useState(false);

  async function handleCreateEvent(event: FormEvent) {
    event.preventDefault();
    console.log(user);

    const inputs = formEventToObject(event);

    await handleAsyncFunction(async () => {
      if (!user) throw new Error("Must be signed in to create an event!");
      if (user.privilege == "user")
        throw new Error("User cannot create an event!");

      await supabase.rpc("create_event", { ...inputs, organizer_id: user.id });
    }, "Created event successfully!");
  }

  return (
    // rough idea, make into nice drop down later
    <section className="w-full ">
      <div className={`p-2  transition-all ${!isCreatingEvent && "hidden"}`}>
        <h5>Create An Event</h5>

        <form onSubmit={handleCreateEvent} action="">
          <Input name="title" placeholder="ex. Hiking" />
          <Input title="Date" name="date" type="date" />
          <Input name="location" placeholder="ex. Mt. Kammungay" type="" />
          <Textarea name="info" placeholder="ex. A hike to the woods" />

          <Button isLoading={false} type="submit">
            Create Event
          </Button>
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
