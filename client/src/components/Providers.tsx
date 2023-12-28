"use client";

import { store } from "@/context/store";
import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import { Toaster } from "./UI/Toast/Toaster";

export default function Providers({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <Provider store={store}>
      {children}
      <Toaster />
    </Provider>
  );
}
