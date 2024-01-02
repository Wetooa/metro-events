"use client";

import AvatarComponent from "@/components/AvatarComponent";
import BadgeComponent from "@/components/BadgeComponent";
import EventsPage from "@/components/EventsPage";
import { Button } from "@/components/UI/Button";
import { toast } from "@/components/UI/Toast/use-toast";
import { useAppSelector } from "@/context/hooks";
import { supabase } from "@/lib/supabase";
import { JoinEventRequests } from "@/types/supabase.interface";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/UI/Tabs";
import moment from "moment";
import { dateFormatter } from "@/lib/utils";

export function useFetchAllJoinEventRequests() {
  const router = useRouter();
  const { user } = useAppSelector((state) => state.user);
  const [joinEventRequests, setJoinEventRequests] = useState<
    JoinEventRequests[]
  >([]);

  useEffect(() => {
    const fetchJoinEventRequests = async () => {
      try {
        if (!user) {
          throw new Error(
            "User must be authenticated see your event requests!"
          );
        }

        const { data, error } = await supabase.rpc(
          "get_all_organizer_join_event_requests",
          {
            user_id_input: user.id,
          }
        );

        if (error) throw new Error(error.message);
        setJoinEventRequests(data);
      } catch (error: any) {
        toast({ title: " Error", description: error.message });
      }
    };
    fetchJoinEventRequests();
  }, [router, user]);

  return joinEventRequests;
}

export default function Organizer() {
  const { user } = useAppSelector((state) => state.user);
  const joinEventRequests = useFetchAllJoinEventRequests();

  async function handleAcceptRequest(eventId: string, requesterId: string) {
    try {
      const { error } = await supabase.rpc("accept_request_to_join_event", {
        user_id_input: requesterId,
        event_id_input: eventId,
        acceptor_id_input: user?.id,
      });
      if (error) throw new Error(error.message);
      toast({
        title: "Request Accepted Success",
        description: "You have successfully accepted a user into an event!",
      });
    } catch (error: any) {
      toast({ title: "Request Error", description: error.message });
    }
  }

  return (
    <div>
      <div className="p-2 space-y-2 border-b border-white/20 cursor-default">
        <h3>Organizer Tab</h3>
        <p className="px-2 font-light opacity-80 text-sm">
          Manage your events!
        </p>
      </div>
      <Tabs defaultValue="organized" className="mt-2">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="organized">Organized</TabsTrigger>
          <TabsTrigger value="eventRequests">Event Requests</TabsTrigger>
        </TabsList>

        <TabsContent value="organized">
          <div className="border-t-2 border-white/20">
            <div className="py-2 px-4">
              <h5>Organized Events</h5>
              <p className="px-2 font-light opacity-80 text-sm">
                Ensure that everything is going smoothly!
              </p>
            </div>
            <EventsPage filter="organized" />
          </div>
        </TabsContent>
        <TabsContent value="eventRequests">
          <div className="border-t-2 border-white/20">
            <div className="py-2 px-4">
              <h5>Join Event Requests</h5>
              <p className="px-2 font-light opacity-80 text-sm">
                Accept people into events!
              </p>
            </div>
            <div>
              {joinEventRequests.length > 0 ? (
                joinEventRequests.map(
                  ({
                    id,
                    event_id,
                    message,
                    requested_at,
                    requester,
                    user_id,
                  }) => {
                    const { email, privilege, username } = requester;

                    return (
                      <div
                        className="flex p-4 border-b border-white/20 gap-2"
                        key={id}
                      >
                        <AvatarComponent
                          fallbackText={[username]}
                          userId={user_id}
                        />
                        <div className="space-y-1 flex-1">
                          <div className="flex gap-2">
                            <Link
                              className="hover:underline"
                              href={`/profile/${user_id}`}
                            >
                              {username}
                            </Link>
                            <BadgeComponent
                              privilege={privilege}
                              userId={user_id}
                            />
                          </div>
                          <div className="opacity-80 text-xs px-1">
                            <p>{email}</p>
                            <p>
                              Requested at {moment(requested_at).calendar()} -{" "}
                              {dateFormatter(requested_at ?? "")}
                            </p>
                          </div>
                          <p className="text-sm">{message}</p>
                        </div>
                        <div className="h-full flex items-center gap-2 text-sm">
                          <Button
                            onClick={() =>
                              handleAcceptRequest(event_id, user_id)
                            }
                            className="rounded-full"
                            size={"sm"}
                          >
                            Accept
                          </Button>
                        </div>
                      </div>
                    );
                  }
                )
              ) : (
                <div className="w-full flex flex-col gap-2 opacity-80 cursor-default items-center justify-center h-screen pb-[20%]">
                  <h3>No Requests</h3>
                  <p className="text-sm font-light">
                    No requests at the moment! Nothing to look at here...
                  </p>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
