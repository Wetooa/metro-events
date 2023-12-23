"use client";

import { store } from "@/context/store";
import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

export default function Providers({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <Provider store={store}>
      {children}

      <ToastContainer
        closeButton
        draggable
        theme="dark"
        position="bottom-right"
      />
    </Provider>
  );
}
