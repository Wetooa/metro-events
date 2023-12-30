"use client";

import { ModeToggle } from "../NextTheme/ModeToggle";
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
import { Calendar } from "../UI/Calendar";
import { Badge } from "../UI/Badge";
import { Button } from "../UI/Button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../UI/Avatar";

export default function UserDetails() {
  const router = useRouter();
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
            <div className="flex gap-2">
              <div>
                <Avatar
                  className="hover:opacity-80 transition-all"
                  onClick={(event) => {
                    event.stopPropagation();
                    router.push(`/profile/${user.id}`);
                  }}
                >
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
              <div>
                <CardTitle className="mb-2">
                  <Link
                    className="hover:underline"
                    href={`/profile/${user.id}`}
                  >
                    Hello {user.firstname} {user.lastname}!
                  </Link>
                </CardTitle>
                <CardDescription>
                  <div className="flex gap-2">
                    <p className="text-sm font-light">@{user.username}</p>
                    <Badge>{user.privilege}</Badge>
                  </div>
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p>{user.info}</p>
          </CardContent>
          <CardContent>
            <p>{user.info}</p>
            {/* <div className="w-full">
              <Calendar mode="single" className="rounded-md border shadow" />
            </div> */}
          </CardContent>
          <CardFooter>
            <div className="flex justify-between w-full">
              <Logout />
              <ModeToggle />
            </div>
          </CardFooter>
        </>
      ) : (
        <section className="px-2 pb-4">
          <h3 className="my-2">Join Now</h3>
          <LoginForm />
        </section>
      )}
    </Card>
  );
}
