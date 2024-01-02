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
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../UI/Avatar";
import {
  BellIcon,
  CheckIcon,
  ClockIcon,
  ComponentPlaceholderIcon,
  HandIcon,
} from "@radix-ui/react-icons";
import { dateFormatter } from "@/lib/utils";
import BadgeComponent from "../BadgeComponent";
import { Button } from "../UI/Button";
import { Dialog, DialogTrigger, DialogContent } from "@/components/UI/Dialog";
import AvatarComponent from "../AvatarComponent";
import NoNotifications from "../Notifications/NoNotifications";
import { useFetchNotifications } from "@/lib/notifHelpers";

export default function UserDetails() {
  const router = useRouter();
  const { user } = useAppSelector((state) => state.user);
  const { markedNotifications, unmarkedNotifications } =
    useFetchNotifications();

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
                <AvatarComponent
                  fallbackText={[user.firstname, user.lastname]}
                  userId={user.id}
                />
              </div>
              <div>
                <Link className="hover:underline" href={`/profile/${user.id}`}>
                  <CardTitle className="mb-2">
                    {user.firstname} {user.lastname}
                  </CardTitle>
                </Link>
                <div className="text-xs opacity-80">
                  <div className="flex gap-2">
                    <p className="text-sm font-light">@{user.username}</p>
                    <BadgeComponent
                      userId={user.id}
                      privilege={user.privilege}
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="text-xs opacity-80 space-y-1">
            <div className="flex items-center gap-2">
              <ComponentPlaceholderIcon />
              <p>Lives in {user.address}</p>
            </div>
            <div className="flex items-center gap-2">
              <HandIcon />
              <p>Born {dateFormatter(user.birthday as string)}</p>
            </div>
            <div className="flex items-center gap-2">
              <ClockIcon />
              <p>Joined {dateFormatter(user.created_at)}</p>
            </div>
          </CardContent>
          <CardContent>{user.info}</CardContent>
          <CardFooter>
            <div className="flex justify-between w-full">
              <Logout />
              <div className="flex items-center gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="" variant={"outline"}>
                      <BellIcon />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <Card className="border-none">
                      <CardHeader>
                        <CardTitle>Notifications</CardTitle>
                        <CardDescription>
                          You have{" "}
                          {unmarkedNotifications
                            ? unmarkedNotifications.length
                            : 0}{" "}
                          unread messages.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="grid gap-4">
                        <div className=" flex items-center space-x-4 rounded-md border p-4">
                          <BellIcon />
                          <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium leading-none">
                              Push Notifications are ON
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Send notifications to device.
                            </p>
                          </div>
                        </div>
                        <div>
                          {unmarkedNotifications &&
                          unmarkedNotifications.length > 0 ? (
                            unmarkedNotifications.map((notification, index) => (
                              <div
                                key={index}
                                className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                              >
                                <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                                <div className="space-y-1">
                                  <p className="text-sm font-medium leading-none">
                                    {notification.title}
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    {notification.message}
                                  </p>
                                </div>
                              </div>
                            ))
                          ) : (
                            <NoNotifications />
                          )}
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full">
                          <CheckIcon className="mr-2 h-4 w-4" /> Mark all as
                          read
                        </Button>
                      </CardFooter>
                    </Card>
                  </DialogContent>
                </Dialog>

                <ModeToggle />
              </div>
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
