import EventsPage from "@/components/EventsPage";
import React from "react";

export default function Bookmarks() {
  return (
    <div>
      <div className="p-2 space-y-2 border-b border-white/20 cursor-default">
        <h3>Bookmarked Events</h3>
        <p className="px-2 font-light opacity-80 text-sm">
          Review may be forgetten events!
        </p>
      </div>
      <EventsPage filter="bookmarked" />
    </div>
  );
}
