import LeftSidebarLink from "./LeftSidebarLink";

export default function LeftSidebar() {
  return (
    <nav className="h-full border-r border-white/20 w-72 sticky left-0 top-0">
      <h4 className="">Metro Events</h4>

      <ul className="flex flex-col gap-2 items-center">
        <LeftSidebarLink name={"home"} src={"/"} />
        <LeftSidebarLink name={"profile"} src={"/profile"} />
        <LeftSidebarLink name={"notifications"} src={"/notifications"} />
        <LeftSidebarLink name={"bookmarks"} src={"/bookmarks"} />
      </ul>
    </nav>
  );
}
