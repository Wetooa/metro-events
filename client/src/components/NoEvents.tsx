interface NoEventsProps {}

export default function NoEvents({}: NoEventsProps) {
  return (
    <div className="w-full flex flex-col gap-2 opacity-80 cursor-default items-center justify-center h-screen pb-[20%]">
      <h3>No Events</h3>
      <p className="text-sm font-light">Populate the website please T_T</p>
    </div>
  );
}
