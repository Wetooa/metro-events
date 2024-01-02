"use client";

import SearchBar from "./SearchBar";
import UserDetails from "./UserDetails";
import WhatsHappening from "./WhatsHappening";

export default function RightSidebarComponent() {
  return (
    <div className="h-screen">
      <SearchBar />
      <UserDetails />
      {/* <WhatsHappening /> */}
    </div>
  );
}
