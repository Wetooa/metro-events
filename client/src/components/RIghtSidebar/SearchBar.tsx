"use client";

import React from "react";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from "@/components/UI/Command";
import CalendarDrawer from "../CalendarDrawer";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/context/hooks";

export default function SearchBar() {
  const { user } = useAppSelector((state) => state.user);
  const router = useRouter();

  return (
    <Command className="h-fit py-2">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <CalendarDrawer />
          </CommandItem>
          <CommandItem>Search Emoji</CommandItem>
          <CommandItem>Calculator</CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem onClick={() => router.push(`/profile/${user?.id}`)}>
            Profile
          </CommandItem>
          <CommandItem>Billing</CommandItem>
          <CommandItem>Settings</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>

    // <Input />
  );
}
