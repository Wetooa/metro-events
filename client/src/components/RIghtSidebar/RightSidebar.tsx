import SearchBar from "./SearchBar";
import UserDetails from "./UserDetails";
import WhatsHappening from "./WhatsHappening";

export default function RightSidebar() {
  return (
    <aside className="h-screen">
      <SearchBar />
      <UserDetails />
      {/* <WhatsHappening /> */}
    </aside>
  );
}
