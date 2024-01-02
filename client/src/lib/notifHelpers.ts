import { useAppSelector } from "@/context/hooks";
import { NotificationsProps } from "@/types/supabase.interface";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { supabase } from "./supabase";
import { toast } from "@/components/UI/Toast/use-toast";
import { Database } from "@/types/supabase.types";

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
        if (!user)
          throw new Error(
            "User must be logged in to have personalized notifications!"
          );

        const { data, error } = await supabase.rpc("get_notifications", {
          user_id_input: user.id,
        });
        if (error) throw new Error(error.message);
        if (!data) throw new Error("Something went wrong...");

        setMarkedNotifications(
          data.filter(
            (notification) => notification.is_read
          ) as NotificationsProps[]
        );
        setUnmarkedNotifications(
          data.filter(
            (notification) => !notification.is_read
          ) as NotificationsProps[]
        );
      } catch (error: any) {
        toast({ title: "Notification Error", description: error.message });
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
