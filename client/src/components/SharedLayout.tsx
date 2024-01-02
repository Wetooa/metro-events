"use client";

import React, { ReactNode } from "react";
import LeftSidebar from "@/components/LeftSidebar/LeftSidebar";
import RightSidebarComponent from "@/components/RightSidebar/RightSidebarComponent";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "./UI/Resizable";

export default function SharedLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <ResizablePanelGroup className="w-full" direction="horizontal">
      <ResizablePanel defaultSize={25} className="">
        <LeftSidebar />
      </ResizablePanel>

      <ResizableHandle />
      <ResizablePanel>
        <div className="pb-10">{children}</div>
      </ResizablePanel>
      <ResizableHandle />

      <ResizablePanel defaultSize={25}>
        <RightSidebarComponent />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
