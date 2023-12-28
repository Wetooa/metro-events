import AccountDetails from "@/components/ProfilePage/AccountDetails";
import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <section>
      <div>
        <Link href={"/"} className="">
          back button
        </Link>
      </div>

      <AccountDetails />

      <section>
        <div className="flex justify-around h-16 border-b border-2-white/20">
          <button className="">Followed Events</button>
          <button className="">Comments</button>
          <button className="">Likes</button>
        </div>

        <section>
          {/* FOLLOWED EVENTS COMPONENT HERE (BUT DO REALTIME SHIT FIRST) */}
        </section>
      </section>
    </section>
  );
}
