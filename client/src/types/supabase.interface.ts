import { Database } from "./supabase.types";


export type UserProps = Database["public"]["Tables"]["users"]["Row"];
