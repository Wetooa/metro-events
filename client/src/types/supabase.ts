export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      comments: {
        Row: {
          comment: string
          comment_id: string
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          comment: string
          comment_id: string
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          comment?: string
          comment_id?: string
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "comments_comment_id_fkey"
            columns: ["comment_id"]
            isOneToOne: false
            referencedRelation: "comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      event_members: {
        Row: {
          acceptor_id: string | null
          event_id: string | null
          joined_at: string
          user_id: string
        }
        Insert: {
          acceptor_id?: string | null
          event_id?: string | null
          joined_at?: string
          user_id: string
        }
        Update: {
          acceptor_id?: string | null
          event_id?: string | null
          joined_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_members_acceptor_id_fkey"
            columns: ["acceptor_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_members_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      events: {
        Row: {
          created_at: string
          date: string
          id: string
          info: string
          location: string
          organizer_id: string
          title: string
        }
        Insert: {
          created_at?: string
          date: string
          id?: string
          info: string
          location: string
          organizer_id: string
          title: string
        }
        Update: {
          created_at?: string
          date?: string
          id?: string
          info?: string
          location?: string
          organizer_id?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "events_organizer_id_fkey"
            columns: ["organizer_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      join_event_requests: {
        Row: {
          event_id: string
          message: string | null
          requested_at: string
          user_id: string
        }
        Insert: {
          event_id: string
          message?: string | null
          requested_at?: string
          user_id: string
        }
        Update: {
          event_id?: string
          message?: string | null
          requested_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "join_event_requests_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "join_event_requests_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      join_organizer_requests: {
        Row: {
          id: string
          message: string | null
          requested_at: string
          user_id: string
        }
        Insert: {
          id?: string
          message?: string | null
          requested_at?: string
          user_id: string
        }
        Update: {
          id?: string
          message?: string | null
          requested_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "join_organizer_requests_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          address: string | null
          birthday: string | null
          created_at: string
          firstname: string | null
          id: string
          info: string | null
          lastname: string | null
          privilege: Database["public"]["Enums"]["privilege_type"]
          username: string
        }
        Insert: {
          address?: string | null
          birthday?: string | null
          created_at?: string
          firstname?: string | null
          id: string
          info?: string | null
          lastname?: string | null
          privilege: Database["public"]["Enums"]["privilege_type"]
          username: string
        }
        Update: {
          address?: string | null
          birthday?: string | null
          created_at?: string
          firstname?: string | null
          id?: string
          info?: string | null
          lastname?: string | null
          privilege?: Database["public"]["Enums"]["privilege_type"]
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      votes: {
        Row: {
          comment_id: string | null
          event_id: string | null
          is_like: boolean
          user_id: string
          voted_at: string
        }
        Insert: {
          comment_id?: string | null
          event_id?: string | null
          is_like: boolean
          user_id: string
          voted_at?: string
        }
        Update: {
          comment_id?: string | null
          event_id?: string | null
          is_like?: boolean
          user_id?: string
          voted_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "votes_comment_id_fkey"
            columns: ["comment_id"]
            isOneToOne: false
            referencedRelation: "comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "votes_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "votes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      delete_user: {
        Args: {
          user_id_input: string
        }
        Returns: undefined
      }
      get_user: {
        Args: {
          user_id_input: string
        }
        Returns: {
          address: string | null
          birthday: string | null
          created_at: string
          firstname: string | null
          id: string
          info: string | null
          lastname: string | null
          privilege: Database["public"]["Enums"]["privilege_type"]
          username: string
        }[]
      }
    }
    Enums: {
      privilege_type: "admin" | "organizer" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
