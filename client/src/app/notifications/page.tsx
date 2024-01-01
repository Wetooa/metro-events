"use client";

import NoNotifications from "@/components/Notifications/NoNotifications";
import NotificationComponent from "@/components/Notifications/NotificationComponent";
import { Button } from "@/components/UI/Button";
import { Skeleton } from "@/components/UI/Skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/UI/Tabs";
import { toast } from "@/components/UI/Toast/use-toast";
import { useAppSelector } from "@/context/hooks";
import { supabase } from "@/lib/supabase";
import { NotificationsProps } from "@/types/supabase.interface";
import { Database } from "@/types/supabase.types";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export function useFetchNotifications() {
  const router = useRouter();
  const { user } = useAppSelector((state) => state.user);
  const [markedNotifications, setMarkedNotifications] = useState<
    NotificationsProps[]
  >([]);
  const [unmarkedNotifications, setUnmarkedNotifications] = useState<
    NotificationsProps[]
  >([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        if (!user) {
          toast({
            title: "Error",
            description:
              "User must be logged in to have personalized notifications!",
          });
          return;
        }
        const { data, error } = await supabase.rpc("get_notifications", {
          user_id_input: user.id,
        });
        if (error) throw new Error(error.message);

        setMarkedNotifications(
          data.filter((notification) => notification.is_read)
        );
        setUnmarkedNotifications(
          data.filter((notification) => !notification.is_read)
        );
      } catch (error) {
        console.log(error);
      }
    };
    fetchNotifications();
  }, [router, user]);

  return { markedNotifications, unmarkedNotifications };
}

export async function handleMarkNotifications(
  props: Database["public"]["Functions"]["mark_notification"]["Args"]
) {
  try {
    const { error } = await supabase.rpc("mark_notification", props);
    if (error) throw new Error(error.message);
    toast({
      title: "Marking Success",
      description: "Notification was successfully marked!",
    });
  } catch (error: any) {
    toast({
      title: "Marking Error",
      description: error.message,
    });
  }
}

export async function handleMarkAllNotifications(
  props: Database["public"]["Functions"]["mark_all_notification"]["Args"]
) {
  try {
    const { error } = await supabase.rpc("mark_all_notification", props);
    if (error) throw new Error(error.message);
    toast({
      title: "Marking Success",
      description: "All notifications were successfully marked!",
    });
  } catch (error: any) {
    toast({
      title: "Marking Error",
      description: error.message,
    });
  }
}

export default function Notifications() {
  const { user } = useAppSelector((state) => state.user);
  const { markedNotifications, unmarkedNotifications } =
    useFetchNotifications();

  if (!user) {
    return <Skeleton />;
  }

  return (
    <div>
      <div className="p-2 space-y-2 border-b border-white/20 cursor-default">
        <h3>Notifications</h3>
        <p className="px-2 font-light opacity-80 text-sm">
          In case you missed something!
        </p>
      </div>

      <Tabs defaultValue="unmarked" className="mt-2">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="unmarked">Unmarked</TabsTrigger>
          <TabsTrigger value="marked">Marked</TabsTrigger>
        </TabsList>
        <TabsContent value="unmarked">
          {unmarkedNotifications.length > 0 ? (
            <div>
              <div className="grid grid-cols-2 p-2 gap-2">
                {unmarkedNotifications.map((notification) => {
                  return (
                    <NotificationComponent
                      key={notification.id}
                      {...notification}
                    />
                  );
                })}
              </div>
              <div className="p-2">
                <Button
                  className="w-full"
                  onClick={() =>
                    handleMarkAllNotifications({
                      user_id_input: user.id,
                      is_read_input: true,
                    })
                  }
                >
                  Mark All as Read
                </Button>
              </div>
            </div>
          ) : (
            <NoNotifications />
          )}
        </TabsContent>
        <TabsContent value="marked">
          {markedNotifications.length > 0 ? (
            <div>
              <div className="grid grid-cols-2 p-2 gap-2  opacity-80">
                {markedNotifications.map((notification) => {
                  return (
                    <NotificationComponent
                      key={notification.id}
                      {...notification}
                    />
                  );
                })}
              </div>
              <div className="p-2">
                <Button
                  className="w-full"
                  onClick={() =>
                    handleMarkAllNotifications({
                      user_id_input: user.id,
                      is_read_input: false,
                    })
                  }
                >
                  Mark All as Unread
                </Button>
              </div>
            </div>
          ) : (
            <NoNotifications />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
