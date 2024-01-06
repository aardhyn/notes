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
      directory: {
        Row: {
          created_at: string
          directory_key: string
          mutated_at: string | null
          name: string
          parent_key: string | null
          user_key: string
        }
        Insert: {
          created_at?: string
          directory_key?: string
          mutated_at?: string | null
          name?: string
          parent_key?: string | null
          user_key?: string
        }
        Update: {
          created_at?: string
          directory_key?: string
          mutated_at?: string | null
          name?: string
          parent_key?: string | null
          user_key?: string
        }
        Relationships: [
          {
            foreignKeyName: "directory_parent_key_fkey"
            columns: ["parent_key"]
            isOneToOne: false
            referencedRelation: "directory"
            referencedColumns: ["directory_key"]
          }
        ]
      }
      note: {
        Row: {
          content: string | null
          created_at: string
          directory_key: string | null
          meta: Json | null
          mutated_at: string | null
          name: string
          note_key: string
          user_key: string
        }
        Insert: {
          content?: string | null
          created_at?: string
          directory_key?: string | null
          meta?: Json | null
          mutated_at?: string | null
          name?: string
          note_key?: string
          user_key?: string
        }
        Update: {
          content?: string | null
          created_at?: string
          directory_key?: string | null
          meta?: Json | null
          mutated_at?: string | null
          name?: string
          note_key?: string
          user_key?: string
        }
        Relationships: [
          {
            foreignKeyName: "note_directory_key_fkey"
            columns: ["directory_key"]
            isOneToOne: false
            referencedRelation: "directory"
            referencedColumns: ["directory_key"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_owner: {
        Args: {
          user_key: string
          directory_key: string
        }
        Returns: boolean
      }
    }
    Enums: {
      NoteType: "note" | "directory"
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
