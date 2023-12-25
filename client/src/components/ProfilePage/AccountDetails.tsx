"use client";

import { useAppSelector } from "@/context/hooks";
import { useRouter } from "next/navigation";

export default function AccountDetails() {
  const { user } = useAppSelector((state) => state.user);
  const router = useRouter();

  if (!user) router.push("/");

  const {
    firstname,
    lastname,
    address,
    birthday,
    created_at,
    email,
    info,
    privilege,
    username,
  } = user!;

  return (
    <section className="relative">
      {/* cover photo */}
      <div className="w-full h-36 bg-slate-200"></div>

      <div>
        {/* profile photo */}
        <div className="absolute top-20 left-5">
          <div className="w-auto h-28 rounded-full aspect-square bg-slate-300"></div>
        </div>

        <div className="mt-16">
          <h6>
            {firstname} {lastname}
          </h6>
          <p>@{username}</p>
          <p>{info}</p>

          <div className="flex">
            <p>{address}</p>
            <p>{birthday}</p>
            <p>{created_at}</p>
          </div>

          <p>Number of followed events</p>
        </div>
      </div>
    </section>
  );
}
