import Event from "@/components/Event";
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

      <section className="relative">
        {/* cover photo */}
        <div className="w-full h-36 bg-slate-200"></div>

        <div>
          {/* profile photo */}
          <div className="absolute top-20 left-5">
            <div className="w-auto h-28 rounded-full aspect-square bg-slate-300"></div>
          </div>

          <div className="mt-16">
            <h6>Fullname</h6>
            <p>@username</p>
            <p>tagline</p>

            <div className="flex">
              <p>Locaation</p>
              <p>Birthday</p>
              <p>Joined when</p>
            </div>

            <p>Number of followed events</p>
          </div>
        </div>
      </section>

      <section>
        <div className="flex justify-around h-16 border-b border-2-white/20">
          <button className="">Followed Events</button>
          <button className="">Comments</button>
          <button className="">Likes</button>
        </div>

        <section>
          <Event />
          <Event />
          <Event />
          <Event />
          <Event />
        </section>
      </section>
    </section>
  );
}
