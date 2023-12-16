import SearchBar from "./SearchBar";
import UserDetails from "./UserDetails";
import WhatsHappening from "./WhatsHappening";

export default function RightSidebar() {
  return (
    <aside className="border-l border-white/20 w-72 sticky right-0 top-0">
      <SearchBar />
      <UserDetails />
      <WhatsHappening />
    </aside>
  );
}
