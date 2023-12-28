import { ModeToggle } from "../NextTheme/ModeToggle";
import LeftSidebarLink from "./LeftSidebarLink";

export default function LeftSidebar() {
  return (
    <nav className="h-full border-r border-white/20 w-72 sticky left-0 top-0">
      <h3 className="w-full text-center">Metro Events</h3>

      <ul className="flex flex-col">
        <LeftSidebarLink name={"home"} href={"/"} />
        <LeftSidebarLink name={"profile"} href={"/profile"} />
        <LeftSidebarLink name={"notifications"} href={"/notifications"} />
        <LeftSidebarLink name={"bookmarks"} href={"/bookmarks"} />
        <LeftSidebarLink name={"messages"} href={"/messages"} />
      </ul>

      <ModeToggle />
    </nav>
  );
}
