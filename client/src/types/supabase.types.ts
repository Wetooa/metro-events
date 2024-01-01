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
      bookmarks: {
        Row: {
          created_at: string | null
          event_id: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          event_id?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          event_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_bookmarks_event_id"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_bookmarks_user_id"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
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
            foreignKeyName: "comments_comment_id_fkey"
            columns: ["comment_id"]
            isOneToOne: false
            referencedRelation: "comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_event_id_fkey"
            columns: ["event_id"]
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
      log_messages: {
        Row: {
          created_at: string | null
          id: number
          message: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          message?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          message?: string | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string | null
          event_id: string | null
          id: string
          is_read: boolean | null
          message: string
          title: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          event_id?: string | null
          id?: string
          is_read?: boolean | null
          message: string
          title?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          event_id?: string | null
          id?: string
          is_read?: boolean | null
          message?: string
          title?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_notifications_event_id"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_notifications_user_id"
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
          id: string
          is_like: boolean | null
          user_id: string | null
          voted_at: string | null
        }
        Insert: {
          comment_id?: string | null
          event_id?: string | null
          id?: string
          is_like?: boolean | null
          user_id?: string | null
          voted_at?: string | null
        }
        Update: {
          comment_id?: string | null
          event_id?: string | null
          id?: string
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
          acceptor_id: string
        }
        Returns: undefined
      }
      accept_request_to_join_event: {
        Args: {
          user_id_input: string
          event_id_input: string
          acceptor_id_input?: string
        }
        Returns: undefined
      }
      bookmark_event: {
        Args: {
          user_id_input: string
          event_id_input: string
        }
        Returns: undefined
      }
      cancel_event: {
        Args: {
          event_id_input: string
        }
        Returns: undefined
      }
      comment_on_comment: {
        Args: {
          event_id_input: string
          user_id_input: string
          comment_id_input: string
          comment: string
        }
        Returns: undefined
      }
      comment_on_event: {
        Args: {
          event_id_input: string
          user_id_input: string
          comment: string
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
              user_id_input?: string
            }
            Returns: Database["public"]["CompositeTypes"]["comments_type"][]
          }
        | {
            Args: {
              event_id_input: string
              user_id_input: string
              comment: string
            }
            Returns: undefined
          }
      get_comment_creator: {
        Args: {
          comment_id_input: string
        }
        Returns: Database["public"]["CompositeTypes"]["creator_type"]
      }
      get_comment_status: {
        Args: {
          comment_id_input: string
          user_id_input?: string
        }
        Returns: Database["public"]["CompositeTypes"]["status_type"]
      }
      get_event: {
        Args: {
          event_id_input: string
          user_id_input?: string
        }
        Returns: Database["public"]["CompositeTypes"]["event_type"]
      }
      get_event_comments: {
        Args: {
          event_id_input: string
          user_id_input?: string
        }
        Returns: Database["public"]["CompositeTypes"]["comments_type"][]
      }
      get_event_members: {
        Args: {
          event_id_input: string
        }
        Returns: Database["public"]["CompositeTypes"]["event_members_type"][]
      }
      get_event_organizer: {
        Args: {
          event_id_input: string
        }
        Returns: Database["public"]["CompositeTypes"]["creator_type"]
      }
      get_event_status: {
        Args: {
          event_id_input: string
          user_id_input?: string
        }
        Returns: Database["public"]["CompositeTypes"]["status_type"]
      }
      get_events: {
        Args: {
          user_id_input?: string
          filter?: Database["public"]["Enums"]["fetch_events_filter"]
        }
        Returns: Database["public"]["CompositeTypes"]["event_type"][]
      }
      get_notifications: {
        Args: {
          user_id_input: string
        }
        Returns: {
          created_at: string | null
          event_id: string | null
          id: string
          is_read: boolean | null
          message: string
          title: string | null
          user_id: string
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
      request_to_be_organizer: {
        Args: {
          user_id_input: string
          message: string
        }
        Returns: undefined
      }
      request_to_join_event: {
        Args: {
          user_id_input: string
          event_id_input: string
          message: string
        }
        Returns: undefined
      }
      unbookmark_event: {
        Args: {
          user_id_input: string
          event_id_input: string
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
      vote_post: {
        Args: {
          user_id_input: string
          event_id_input: string
          is_like_input?: boolean
          comment_id_input?: string
        }
        Returns: undefined
      }
    }
    Enums: {
      fetch_events_filter:
        | "all"
        | "followed"
        | "bookmarked"
        | "commented"
        | "liked"
        | "disliked"
      privilege_type: "admin" | "organizer" | "user"
    }
    CompositeTypes: {
      comments_type: {
        id: string
        event_id: string
        comment_id: string
        user_id: string
        comment: string
        created_at: string
        commenter: Database["public"]["CompositeTypes"]["creator_type"]
        status: Database["public"]["CompositeTypes"]["status_type"]
      }
      creator_type: {
        organizer_id: string
        organizer_name: string
        organizer_privilege: Database["public"]["Enums"]["privilege_type"]
      }
      event_members_type: {
        id: string
        username: string
        privilege: Database["public"]["Enums"]["privilege_type"]
        joined_at: string
      }
      event_type: {
        id: string
        organizer_id: string
        title: string
        info: string
        location: string
        date: string
        created_at: string
        is_cancelled: boolean
        organizer: Database["public"]["CompositeTypes"]["creator_type"]
        status: Database["public"]["CompositeTypes"]["status_type"]
      }
      status_type: {
        event_id: string
        comment_id: string
        upvotes: number
        downvotes: number
        is_voted: number
        comments_count: number
        is_bookmarked: boolean
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
