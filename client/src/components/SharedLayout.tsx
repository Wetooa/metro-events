"use client";

import React, { ReactNode } from "react";
import LeftSidebar from "./LeftSidebar/LeftSidebar";
import RightSidebar from "./RightSidebar/RightSidebar";
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
      <ResizablePanel defaultSize={20} className="">
        <LeftSidebar />
      </ResizablePanel>

      <ResizableHandle />
      <ResizablePanel>
        <div className="pb-10">{children}</div>
      </ResizablePanel>
      <ResizableHandle />

      <ResizablePanel defaultSize={20}>
        <RightSidebar />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
