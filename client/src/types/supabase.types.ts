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
          comment: string | null
          comment_id: string | null
          created_at: string | null
          event_id: string
          id: string
          user_id: string | null
        }
        Insert: {
          comment?: string | null
          comment_id?: string | null
          created_at?: string | null
          event_id: string
          id?: string
          user_id?: string | null
        }
        Update: {
          comment?: string | null
          comment_id?: string | null
          created_at?: string | null
          event_id?: string
          id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "comments_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_comments_comment_id"
            columns: ["comment_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_comments_event_id"
            columns: ["comment_id"]
            isOneToOne: false
            referencedRelation: "comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_comments_user_id"
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
          joined_at: string | null
          user_id: string | null
        }
        Insert: {
          acceptor_id?: string | null
          event_id?: string | null
          joined_at?: string | null
          user_id?: string | null
        }
        Update: {
          acceptor_id?: string | null
          event_id?: string | null
          joined_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_event_members_acceptor_id"
            columns: ["acceptor_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_event_members_event_id"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_event_members_user_id"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      events: {
        Row: {
          created_at: string | null
          date: string | null
          id: string
          info: string | null
          is_cancelled: boolean | null
          location: string | null
          organizer_id: string | null
          title: string | null
        }
        Insert: {
          created_at?: string | null
          date?: string | null
          id?: string
          info?: string | null
          is_cancelled?: boolean | null
          location?: string | null
          organizer_id?: string | null
          title?: string | null
        }
        Update: {
          created_at?: string | null
          date?: string | null
          id?: string
          info?: string | null
          is_cancelled?: boolean | null
          location?: string | null
          organizer_id?: string | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_events_organizer_id"
            columns: ["organizer_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      join_event_requests: {
        Row: {
          event_id: string | null
          message: string | null
          requested_at: string | null
          user_id: string | null
        }
        Insert: {
          event_id?: string | null
          message?: string | null
          requested_at?: string | null
          user_id?: string | null
        }
        Update: {
          event_id?: string | null
          message?: string | null
          requested_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_join_event_requests_event_id"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_join_event_requests_user_id"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      join_organizer_requests: {
        Row: {
          message: string | null
          requested_at: string | null
          user_id: string | null
        }
        Insert: {
          message?: string | null
          requested_at?: string | null
          user_id?: string | null
        }
        Update: {
          message?: string | null
          requested_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_join_organizer_requests_user_id"
            columns: ["user_id"]
            isOneToOne: true
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
          email: string
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
          email: string
          firstname?: string | null
          id: string
          info?: string | null
          lastname?: string | null
          privilege?: Database["public"]["Enums"]["privilege_type"]
          username: string
        }
        Update: {
          address?: string | null
          birthday?: string | null
          created_at?: string
          email?: string
          firstname?: string | null
          id?: string
          info?: string | null
          lastname?: string | null
          privilege?: Database["public"]["Enums"]["privilege_type"]
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_auth_users"
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
          is_like: boolean | null
          user_id: string | null
          voted_at: string | null
        }
        Insert: {
          comment_id?: string | null
          event_id?: string | null
          is_like?: boolean | null
          user_id?: string | null
          voted_at?: string | null
        }
        Update: {
          comment_id?: string | null
          event_id?: string | null
          is_like?: boolean | null
          user_id?: string | null
          voted_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_votes_comment_id"
            columns: ["comment_id"]
            isOneToOne: false
            referencedRelation: "comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_votes_event_id"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_votes_user_id"
            columns: ["user_id"]
            isOneToOne: false
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
      accept_request_to_be_organizer: {
        Args: {
          user_id: string
        }
        Returns: undefined
      }
      accept_request_to_join_event: {
        Args: {
          user_id: string
          event_id: string
          acceptor_id?: string
        }
        Returns: undefined
      }
      cancel_event: {
        Args: {
          event_id: string
        }
        Returns: undefined
      }
      create_event: {
        Args: {
          title: string
          date: string
          location: string
          info: string
          organizer_id: string
        }
        Returns: {
          address: string | null
          birthday: string | null
          created_at: string
          email: string
          firstname: string | null
          id: string
          info: string | null
          lastname: string | null
          privilege: Database["public"]["Enums"]["privilege_type"]
          username: string
        }[]
      }
      delete_event: {
        Args: {
          event_id: string
        }
        Returns: undefined
      }
      delete_user: {
        Args: {
          user_id_input: string
        }
        Returns: undefined
      }
      get_comment_comments:
        | {
            Args: {
              comment_id_input: string
            }
            Returns: Database["public"]["CompositeTypes"]["comments_type"][]
          }
        | {
            Args: {
              event_id: string
              user_id: string
              comment: string
            }
            Returns: undefined
          }
        | {
            Args: {
              event_id: string
              user_id: string
              comment_id: string
              comment: string
            }
            Returns: undefined
          }
      get_event: {
        Args: {
          event_id_input: string
          user_id_input?: string
        }
        Returns: {
          id: string
          organizer_id: string
          organizer_name: string
          title: string
          info: string
          location: string
          date: string
          created_at: string
          upvotes: number
          downvotes: number
          is_voted: number
          is_cancelled: boolean
        }[]
      }
      get_event_comments: {
        Args: {
          event_id_input: string
        }
        Returns: Database["public"]["CompositeTypes"]["comments_type"][]
      }
      get_event_members: {
        Args: {
          event_id_input: string
        }
        Returns: Database["public"]["CompositeTypes"]["event_members_type"][]
      }
      get_events: {
        Args: {
          user_id_input?: string
          only_followed?: boolean
        }
        Returns: {
          id: string
          organizer_id: string
          organizer_name: string
          title: string
          info: string
          location: string
          date: string
          created_at: string
          upvotes: number
          downvotes: number
          is_voted: number
          is_cancelled: boolean
        }[]
      }
      get_user: {
        Args: {
          user_id_input: string
        }
        Returns: {
          address: string | null
          birthday: string | null
          created_at: string
          email: string
          firstname: string | null
          id: string
          info: string | null
          lastname: string | null
          privilege: Database["public"]["Enums"]["privilege_type"]
          username: string
        }[]
      }
      get_votes: {
        Args: {
          event_id_input: string
          user_id_input?: string
        }
        Returns: {
          event_id: string
          upvotes: number
          downvotes: number
          is_voted: number
        }[]
      }
      request_to_be_organizer: {
        Args: {
          user_id: string
          message: string
        }
        Returns: undefined
      }
      request_to_join_event: {
        Args: {
          user_id: string
          event_id: string
          message: string
        }
        Returns: undefined
      }
      unfollow_event: {
        Args: {
          user_id: string
          event_id: string
        }
        Returns: undefined
      }
    }
    Enums: {
      privilege_type: "admin" | "organizer" | "user"
    }
    CompositeTypes: {
      comments_type: {
        id: string
        event_id: string
        comment_id: string
        user_id: string
        commenter_name: string
        comment: string
        created_at: string
      }
      event_members_type: {
        id: string
        username: string
        privilege: Database["public"]["Enums"]["privilege_type"]
        joined_at: string
      }
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
