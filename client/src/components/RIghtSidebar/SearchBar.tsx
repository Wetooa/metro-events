"use client";

import { Command } from "lucide-react";
import React from "react";
import { Input } from "../UI/Input";
// import {
//   CommandInput,
//   CommandList,
//   CommandEmpty,
//   CommandGroup,
//   CommandItem,
//   CommandSeparator,
// } from "../UI/Command";

export default function SearchBar() {
  return (
    // <Command className="flex justify-center py-2">
    //   <CommandInput placeholder="Type a command or search..." />
    //   <CommandList>
    //     <CommandEmpty>No results found.</CommandEmpty>
    //     <CommandGroup heading="Suggestions">
    //       <CommandItem>Calendar</CommandItem>
    //       <CommandItem>Search Emoji</CommandItem>
    //       <CommandItem>Calculator</CommandItem>
    //     </CommandGroup>
    //     <CommandSeparator />
    //     <CommandGroup heading="Settings">
    //       <CommandItem>Profile</CommandItem>
    //       <CommandItem>Billing</CommandItem>
    //       <CommandItem>Settings</CommandItem>
    //     </CommandGroup>
    //   </CommandList>
    // </Command>

    <Input />
  );
}
