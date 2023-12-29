import { Database } from "./supabase.types";


export type UserProps = Database["public"]["Tables"]["users"]["Row"];
export type GetAllEventsProps = Database["public"]["Functions"]["get_events"]["Returns"][0]
export type EventProps = Database["public"]["Functions"]["get_event"]["Returns"][0]
export type EventMembersProps = Database["public"]["CompositeTypes"]["event_members_type"];
export type CommentProps = Database["public"]["CompositeTypes"]["comments_type"];
