"use client";

import NoNotifications from "@/components/Notifications/NoNotifications";
import NotificationComponent from "@/components/Notifications/NotificationComponent";
import { toast } from "@/components/UI/Toast/use-toast";
import { useAppSelector } from "@/context/hooks";
import { supabase } from "@/lib/supabase";
import { NotificationsProps } from "@/types/supabase.interface";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export function useFetchNotifications() {
  const router = useRouter();
  const { user } = useAppSelector((state) => state.user);
  const [notifications, setNotifications] = useState<NotificationsProps[]>([]);

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
        setNotifications(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchNotifications();
  }, [router, user]);

  return notifications;
}

export default function Notifications() {
  const notifications = useFetchNotifications();

  return (
    <div>
      <div className="p-2 space-y-2 border-b border-white/20 cursor-default">
        <h3>Notifications</h3>
        <p className="px-2 font-light opacity-80 text-sm">
          In case you missed something!
        </p>
      </div>
      <div>
        {notifications.length > 0 ? (
          notifications.map((notification) => {
            return (
              <NotificationComponent key={notification.id} {...notification} />
            );
          })
        ) : (
          <NoNotifications />
        )}
      </div>
    </div>
  );
}
