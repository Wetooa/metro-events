import { Database } from "./supabase.types";


export type UserProps = Database["public"]["Tables"]["users"]["Row"];
export type GetAllEventsProps = Database["public"]["Functions"]["get_events"]["Returns"][0]
export type EventProps = Database["public"]["Functions"]["get_event"]["Returns"]
export type EventMembersProps = Database["public"]["CompositeTypes"]["event_members_type"];
export type CommentProps = Database["public"]["CompositeTypes"]["comments_type"];
export type GetAllEventsFilter = Database["public"]["Enums"]["fetch_events_filter"];
export type VoteProps = Database["public"]["Functions"]["vote_post"]["Args"];
export type StatusProps = Database["public"]["CompositeTypes"]["status_type"]
export type NotificationsProps = Database["public"]["Functions"]["get_notifications"]["Returns"][0]

export interface RecursiveCommentsProps extends CommentProps {
  comments: RecursiveCommentsProps[];
}
