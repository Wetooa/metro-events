"use client";

import React, { FormEvent, useState } from "react";

function EventForm() {
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
          <label htmlFor="title">Title</label>
          <input type="text" name="title" placeholder="Enter text" />

          <label htmlFor="">Date</label>
          <input type="date" />

          <label htmlFor="">Location</label>
          <input type="text" />

          <label htmlFor="info">Info</label>
          <textarea placeholder=""></textarea>

          <button type="submit">Create Event</button>
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

export default EventForm;
