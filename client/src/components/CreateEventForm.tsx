"use client";

import React, { FormEvent, useState } from "react";
import Input from "./UI/Input";
import Textarea from "./UI/Textarea";
import Button from "./UI/Button";
import { formEventToObject, handleSupabaseAsyncError } from "@/utils/utils";
import { supabase } from "@/utils/supabase";

function CreateEventForm() {
  const [isCreatingEvent, setIsCreatingEvent] = useState(false);

  async function handleCreateEvent(event: FormEvent) {
    event.preventDefault();
    const inputs = formEventToObject(event);

    await handleSupabaseAsyncError(() =>
      supabase.rpc("create_event", { ...inputs })
    );
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
