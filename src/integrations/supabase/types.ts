export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      computers: {
        Row: {
          brand: string
          created_at: string | null
          department_id: string | null
          employee_id: string | null
          id: string
          inventory_number: string
          ip_address: string | null
          mac_address: string | null
          model: string
          notes: string | null
          os: string | null
          processor: string | null
          purchase_date: string | null
          ram: number | null
          status: string | null
          storage: number | null
          storage_type: string | null
          updated_at: string | null
          warranty_end_date: string | null
        }
        Insert: {
          brand: string
          created_at?: string | null
          department_id?: string | null
          employee_id?: string | null
          id?: string
          inventory_number: string
          ip_address?: string | null
          mac_address?: string | null
          model: string
          notes?: string | null
          os?: string | null
          processor?: string | null
          purchase_date?: string | null
          ram?: number | null
          status?: string | null
          storage?: number | null
          storage_type?: string | null
          updated_at?: string | null
          warranty_end_date?: string | null
        }
        Update: {
          brand?: string
          created_at?: string | null
          department_id?: string | null
          employee_id?: string | null
          id?: string
          inventory_number?: string
          ip_address?: string | null
          mac_address?: string | null
          model?: string
          notes?: string | null
          os?: string | null
          processor?: string | null
          purchase_date?: string | null
          ram?: number | null
          status?: string | null
          storage?: number | null
          storage_type?: string | null
          updated_at?: string | null
          warranty_end_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "computers_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "computers_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      departments: {
        Row: {
          created_at: string | null
          description: string | null
          email: string | null
          floor: number | null
          head_name: string | null
          id: string
          name: string
          phone: string | null
          room_number: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          email?: string | null
          floor?: number | null
          head_name?: string | null
          id?: string
          name: string
          phone?: string | null
          room_number?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          email?: string | null
          floor?: number | null
          head_name?: string | null
          id?: string
          name?: string
          phone?: string | null
          room_number?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      employees: {
        Row: {
          birth_date: string | null
          created_at: string | null
          department_id: string | null
          email: string | null
          full_name: string
          hire_date: string | null
          id: string
          internal_phone: string | null
          phone: string | null
          photo_url: string | null
          position: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          birth_date?: string | null
          created_at?: string | null
          department_id?: string | null
          email?: string | null
          full_name: string
          hire_date?: string | null
          id?: string
          internal_phone?: string | null
          phone?: string | null
          photo_url?: string | null
          position: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          birth_date?: string | null
          created_at?: string | null
          department_id?: string | null
          email?: string | null
          full_name?: string
          hire_date?: string | null
          id?: string
          internal_phone?: string | null
          phone?: string | null
          photo_url?: string | null
          position?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employees_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
        ]
      }
      phones: {
        Row: {
          brand: string
          created_at: string | null
          department_id: string | null
          employee_id: string | null
          id: string
          imei: string | null
          inventory_number: string
          model: string
          notes: string | null
          phone_number: string | null
          purchase_date: string | null
          status: string | null
          updated_at: string | null
          warranty_end_date: string | null
        }
        Insert: {
          brand: string
          created_at?: string | null
          department_id?: string | null
          employee_id?: string | null
          id?: string
          imei?: string | null
          inventory_number: string
          model: string
          notes?: string | null
          phone_number?: string | null
          purchase_date?: string | null
          status?: string | null
          updated_at?: string | null
          warranty_end_date?: string | null
        }
        Update: {
          brand?: string
          created_at?: string | null
          department_id?: string | null
          employee_id?: string | null
          id?: string
          imei?: string | null
          inventory_number?: string
          model?: string
          notes?: string | null
          phone_number?: string | null
          purchase_date?: string | null
          status?: string | null
          updated_at?: string | null
          warranty_end_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "phones_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "phones_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      printers: {
        Row: {
          brand: string
          created_at: string | null
          department_id: string | null
          id: string
          inventory_number: string
          ip_address: string | null
          location: string | null
          model: string
          notes: string | null
          printer_type: string | null
          purchase_date: string | null
          status: string | null
          updated_at: string | null
          warranty_end_date: string | null
        }
        Insert: {
          brand: string
          created_at?: string | null
          department_id?: string | null
          id?: string
          inventory_number: string
          ip_address?: string | null
          location?: string | null
          model: string
          notes?: string | null
          printer_type?: string | null
          purchase_date?: string | null
          status?: string | null
          updated_at?: string | null
          warranty_end_date?: string | null
        }
        Update: {
          brand?: string
          created_at?: string | null
          department_id?: string | null
          id?: string
          inventory_number?: string
          ip_address?: string | null
          location?: string | null
          model?: string
          notes?: string | null
          printer_type?: string | null
          purchase_date?: string | null
          status?: string | null
          updated_at?: string | null
          warranty_end_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "printers_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          full_name: string
          id: string
          phone: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          full_name: string
          id: string
          phone?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string
          id?: string
          phone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      turnstiles: {
        Row: {
          created_at: string | null
          id: string
          installation_date: string | null
          ip_address: string | null
          last_maintenance_date: string | null
          location: string
          model: string | null
          name: string
          notes: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          installation_date?: string | null
          ip_address?: string | null
          last_maintenance_date?: string | null
          location: string
          model?: string | null
          name: string
          notes?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          installation_date?: string | null
          ip_address?: string | null
          last_maintenance_date?: string | null
          location?: string
          model?: string | null
          name?: string
          notes?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
