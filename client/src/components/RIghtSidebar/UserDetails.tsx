"use client";

import React, { useEffect } from "react";
import LoginForm from "../Login/LoginForm";
import { useAppDispatch, useAppSelector } from "@/context/hooks";
import { fetchUser } from "@/context/features/user/userSlice";
import Logout from "../Logout";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../UI/Card";

export default function UserDetails() {
  const { user } = useAppSelector((state) => state.user);

  // might balhin this somewhere
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <Card className="m-2">
      {user ? (
        <>
          <CardHeader>
            <CardTitle>Hello {user.username}!</CardTitle>
            <CardDescription>{user.privilege}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{user.info}</p>
          </CardContent>
          <CardFooter>
            <Logout />
          </CardFooter>
        </>
      ) : (
        <section className="px-2 pb-4">
          <h3>Join Now</h3>
          <LoginForm />
        </section>
      )}
    </Card>
  );
}
