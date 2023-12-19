"use client";

import React, { FormEvent, useState } from "react";
import Input from "./UI/Input";
import Textarea from "./UI/Textarea";
import Button from "./UI/Button";

function CreateEventForm() {
  const [isCreatingEvent, setIsCreatingEvent] = useState(false);

  function handleCreateEvent(event: FormEvent) {
    event.preventDefault();
  }

  return (
    // rough idea, make into nice drop down later
    <section className="w-full ">
      <div className={`p-2  transition-all ${!isCreatingEvent && "hidden"}`}>
        <h5>Create An Event</h5>

        <form onSubmit={handleCreateEvent} action="">
          <Input
            title="Title"
            name="title"
            type="text"
            placeholder="ex. Hiking"
          />
          <Input title="Date" name="date" type="date" />
          <Input
            title="Address"
            name="address"
            type="text"
            placeholder="ex. Mt. Kammungay"
          />
          <Input title="Location" name="location" type="text" />
          <Textarea
            title="Info"
            name="info"
            placeholder="ex. A hike to the woods"
          />

          <Button isLoading={false} content="Create Event" type="submit">
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
