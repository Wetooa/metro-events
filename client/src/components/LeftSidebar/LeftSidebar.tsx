import LeftSidebarLink from "./LeftSidebarLink";

export default function LeftSidebar() {
  return (
    <nav className="h-full border-r border-white/20 w-72 sticky left-0 top-0">
      <h4 className="">Metro Events</h4>

      <ul className="flex flex-col gap-2 items-center">
        <LeftSidebarLink name={"home"} href={"/"} />
        <LeftSidebarLink name={"profile"} href={"/profile"} />
        <LeftSidebarLink name={"notifications"} href={"/notifications"} />
        <LeftSidebarLink name={"bookmarks"} href={"/bookmarks"} />
      </ul>
    </nav>
  );
}
