import React from "react";

export default function Event() {
  return (
    <section className="border-t border-white/20 p-4">
      <h6 className="">Event Title</h6>
      <p className="text-sm">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Error fugiat ad
        ut. Dolore, incidunt sed hic saepe quaerat at accusantium ullam vitae
        officiis. Delectus reprehenderit dicta ratione fugiat. Quasi, mollitia.
      </p>

      <div className="w-full h-20 px-6 mt-2">
        {/* tmp img */}
        <div className="bg-slate-200 w-full h-20 rounded-md"></div>
      </div>

      <div className="flex w-full justify-around">
        <button className="hover:bg-white/30 rounded-full p-1 px-2">A</button>
        <button className="hover:bg-white/30 rounded-full p-1 px-2">A</button>
        <button className="hover:bg-white/30 rounded-full p-1 px-2">A</button>
        <button className="hover:bg-white/30 rounded-full p-1 px-2">A</button>
      </div>
    </section>
  );
}
