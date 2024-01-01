"use client";

import AvatarComponent from "@/components/AvatarComponent";
import BadgeComponent from "@/components/BadgeComponent";
import { Button } from "@/components/UI/Button";
import { Skeleton } from "@/components/UI/Skeleton";
import { toast } from "@/components/UI/Toast/use-toast";
import { useAppSelector } from "@/context/hooks";
import { supabase } from "@/lib/supabase";
import { JoinOrganizerRequests } from "@/types/supabase.interface";
import Link from "next/link";
import { useEffect, useState } from "react";

function useFetchJoinOrganizerRequests() {
  const [joinOrganizerRequests, setJoinOrganizerRequests] = useState<
    JoinOrganizerRequests[]
  >([]);

  useEffect(() => {
    const fetchJoinOrganizerRequests = async () => {
      try {
        const { data, error } = await supabase.rpc(
          "get_all_join_organizer_requests"
        );
        if (error) throw new Error(error.message);
        setJoinOrganizerRequests(data);
      } catch (error: any) {
        console.log(error);
      }
    };
    fetchJoinOrganizerRequests();
  }, []);

  return joinOrganizerRequests;
}

export default function Admin() {
  const joinOrganizerRequests = useFetchJoinOrganizerRequests();
  const { user } = useAppSelector((state) => state.user);

  if (!user) {
    return <Skeleton />;
  }

  async function handleDenyRequest(requesterId: string) {
    try {
      const { error } = await supabase.rpc("deny_request_to_be_organizer", {
        user_id_input: requesterId,
      });
      if (error) throw new Error(error.message);
      toast({
        title: "Request Deny Success",
        description: "You have successfully denied a user!",
      });
    } catch (error: any) {
      toast({ title: "Request Error", description: error.message });
    }
  }

  async function handleAcceptRequest(requesterId: string) {
    try {
      const { error } = await supabase.rpc("accept_request_to_be_organizer", {
        user_id_input: requesterId,
      });
      if (error) throw new Error(error.message);
      toast({
        title: "Request Accepted Success",
        description: "You have successfully accepted a user!",
      });
    } catch (error: any) {
      toast({ title: "Request Error", description: error.message });
    }
  }

  return (
    <div>
      <div className="p-2 space-y-2 border-b border-white/20 cursor-default">
        <h3>Admin Tab</h3>
        <p className="px-2 font-light opacity-80 text-sm">
          Manage the website!
        </p>
      </div>
      <div>
        {joinOrganizerRequests.length > 0 ? (
          <div>
            <h6 className="p-4 border-b border-white/20">Organizer Requests</h6>
            {joinOrganizerRequests.map(
              ({ id, message, requested_at, user_id, requester }) => {
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
                      <p className="opacity-80 text-xs">{email}</p>
                      <p className="text-sm">{message}</p>
                    </div>
                    <div className="h-full flex items-center gap-2 text-sm">
                      <Button
                        onClick={() => handleAcceptRequest(user_id)}
                        className="rounded-full"
                        size={"sm"}
                      >
                        Accept
                      </Button>
                      <Button
                        onClick={() => handleDenyRequest(user_id)}
                        className="rounded-full"
                        size={"sm"}
                        variant={"destructive"}
                      >
                        Deny
                      </Button>
                    </div>
                  </div>
                );
              }
            )}
          </div>
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
  );
}
