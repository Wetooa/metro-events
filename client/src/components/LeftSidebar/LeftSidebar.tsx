"use client";

import {
  HomeIcon,
  PersonIcon,
  BellIcon,
  BookmarkIcon,
  ChatBubbleIcon,
} from "@radix-ui/react-icons";
import LeftSidebarLink from "./LeftSidebarLink";
import { useAppSelector } from "@/context/hooks";
import Link from "next/link";

export default function LeftSidebar() {
  const { user } = useAppSelector((state) => state.user);

  return (
    <nav className="h-screen">
      <Link className="hover:opacity-80 transition-all" href={"/"}>
        <h3 className="w-full text-center p-2">Metro Events</h3>
      </Link>

      <ul className="flex flex-col my-2">
        <LeftSidebarLink
          Icon={HomeIcon}
          tooltip="Homepage"
          name={"home"}
          href={"/"}
        />
        <LeftSidebarLink
          Icon={PersonIcon}
          tooltip="See your profile"
          name={"profile"}
          href={`/profile/${user?.id}`}
        />
        <LeftSidebarLink
          Icon={BellIcon}
          tooltip="Keep updated"
          name={"notifications"}
          href={"/notifications"}
        />
        <LeftSidebarLink
          Icon={BookmarkIcon}
          tooltip="Keep track of Events"
          name={"bookmarks"}
          href={"/bookmarks"}
        />
        <LeftSidebarLink
          Icon={ChatBubbleIcon}
          tooltip="Chat with people"
          name={"messages"}
          href={"/messages"}
        />
      </ul>
    </nav>
  );
}
