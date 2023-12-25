import CreateEventForm from "@/components/CreateEventForm";
import Main from "@/components/EventsPage/Main";

export default function Home() {
  return (
    <main className="w-full ">
      <section className="flex justify-around h-16 border-b border-2-white/20">
        <button className="">All Events</button>
        <button className="">Following</button>
      </section>

      {/* only if organizer */}
      <CreateEventForm />

      {/* main shet */}
      <Main />
    </main>
  );
}
