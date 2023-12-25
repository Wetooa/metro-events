"use client";

import React, { useEffect } from "react";
import LoginForm from "../Login/LoginForm";
import { useAppDispatch, useAppSelector } from "@/context/hooks";
import { fetchUser } from "@/context/features/user/userSlice";
import Logout from "../Logout";

export default function UserDetails() {
  const { user } = useAppSelector((state) => state.user);

  // might balhin this somewhere
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <section className="m-2 p-2 bg-white/10 rounded-lg">
      {user ? (
        <>
          <h4 className="">{user.username}</h4>

          <p>{user.privilege}</p>
          <p>
            {user.firstname} {user.lastname}
          </p>
          <p>{user.address}</p>

          <Logout />
        </>
      ) : (
        <>
          <h4>Join now</h4>

          <LoginForm />
        </>
      )}
    </section>
  );
}
