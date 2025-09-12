export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          name: string | null
          graduation_year: number | null
          department: string | null
          bio: string | null
          role: 'public' | 'member' | 'admin'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          name?: string | null
          graduation_year?: number | null
          department?: string | null
          bio?: string | null
          role?: 'public' | 'member' | 'admin'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          graduation_year?: number | null
          department?: string | null
          bio?: string | null
          role?: 'public' | 'member' | 'admin'
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_role: 'public' | 'member' | 'admin'
    }
  }
}

export type UserRole = 'public' | 'member' | 'admin'

export type Profile = Database['public']['Tables']['profiles']['Row']
