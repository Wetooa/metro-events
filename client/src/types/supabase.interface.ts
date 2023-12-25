import { Database } from "./supabase.types";


export type UserProps = Database["public"]["Tables"]["users"]["Row"];
export type GetAllEventsProps = Database["public"]["Functions"]["get_events"]["Returns"][0]
