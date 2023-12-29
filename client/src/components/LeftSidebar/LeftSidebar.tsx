import { ModeToggle } from "../NextTheme/ModeToggle";
import {
  HomeIcon,
  PersonIcon,
  BellIcon,
  BookmarkIcon,
  ChatBubbleIcon,
} from "@radix-ui/react-icons";
import LeftSidebarLink from "./LeftSidebarLink";

export default function LeftSidebar() {
  return (
    <nav className="h-screen">
      <h2 className="w-full text-center">Metro Events</h2>

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
          href={"/profile"}
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

      <ModeToggle />
    </nav>
  );
}
