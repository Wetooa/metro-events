import CreateEventForm from "@/components/CreateEventForm";
import AllEvents from "@/components/EventsPage/AllEvents";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/UI/Tabs";

export default function Home() {
  return (
    <main className="w-full ">
      <CreateEventForm />

      <Tabs defaultValue="allEvents" className="w-full">
        <TabsList>
          <TabsTrigger value="allEvents">All Events</TabsTrigger>
          <TabsTrigger value="following">Following</TabsTrigger>
        </TabsList>
        <TabsContent value="allEvents">
          {/* main shet */}
          <AllEvents />
        </TabsContent>
        <TabsContent value="following">
          {/* main shet */}
          <AllEvents />
        </TabsContent>
      </Tabs>
    </main>
  );
}
