// Database Types for Supabase

export interface Database {
  public: {
    Tables: {
      portfolios: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          user_id: string
          name: string
          title: string
          description: string
          email: string
          phone?: string
          location: string
          avatar_url?: string
          resume_url?: string
          is_public: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id: string
          name: string
          title: string
          description: string
          email: string
          phone?: string
          location: string
          avatar_url?: string
          resume_url?: string
          is_public?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id?: string
          name?: string
          title?: string
          description?: string
          email?: string
          phone?: string
          location?: string
          avatar_url?: string
          resume_url?: string
          is_public?: boolean
        }
      }
      projects: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          portfolio_id: string
          title: string
          description: string
          long_description?: string
          image_url?: string
          gallery_urls?: string[]
          technologies: string[]
          live_url?: string
          source_url?: string
          featured: boolean
          category: string
          status: 'completed' | 'in-progress' | 'planned'
          start_date: string
          end_date?: string
          sort_order: number
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          portfolio_id: string
          title: string
          description: string
          long_description?: string
          image_url?: string
          gallery_urls?: string[]
          technologies: string[]
          live_url?: string
          source_url?: string
          featured?: boolean
          category: string
          status: 'completed' | 'in-progress' | 'planned'
          start_date: string
          end_date?: string
          sort_order?: number
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          portfolio_id?: string
          title?: string
          description?: string
          long_description?: string
          image_url?: string
          gallery_urls?: string[]
          technologies?: string[]
          live_url?: string
          source_url?: string
          featured?: boolean
          category?: string
          status?: 'completed' | 'in-progress' | 'planned'
          start_date?: string
          end_date?: string
          sort_order?: number
        }
      }
      skills: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          portfolio_id: string
          name: string
          level: number
          category: 'frontend' | 'backend' | 'database' | 'tools' | 'other'
          icon?: string
          sort_order: number
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          portfolio_id: string
          name: string
          level: number
          category: 'frontend' | 'backend' | 'database' | 'tools' | 'other'
          icon?: string
          sort_order?: number
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          portfolio_id?: string
          name?: string
          level?: number
          category?: 'frontend' | 'backend' | 'database' | 'tools' | 'other'
          icon?: string
          sort_order?: number
        }
      }
      experiences: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          portfolio_id: string
          company: string
          position: string
          description: string
          start_date: string
          end_date?: string
          location: string
          current: boolean
          technologies?: string[]
          sort_order: number
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          portfolio_id: string
          company: string
          position: string
          description: string
          start_date: string
          end_date?: string
          location: string
          current?: boolean
          technologies?: string[]
          sort_order?: number
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          portfolio_id?: string
          company?: string
          position?: string
          description?: string
          start_date?: string
          end_date?: string
          location?: string
          current?: boolean
          technologies?: string[]
          sort_order?: number
        }
      }
      education: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          portfolio_id: string
          institution: string
          degree: string
          field: string
          start_date: string
          end_date?: string
          current: boolean
          description?: string
          gpa?: string
          sort_order: number
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          portfolio_id: string
          institution: string
          degree: string
          field: string
          start_date: string
          end_date?: string
          current?: boolean
          description?: string
          gpa?: string
          sort_order?: number
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          portfolio_id?: string
          institution?: string
          degree?: string
          field?: string
          start_date?: string
          end_date?: string
          current?: boolean
          description?: string
          gpa?: string
          sort_order?: number
        }
      }
      social_links: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          portfolio_id: string
          name: string
          url: string
          icon: string
          sort_order: number
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          portfolio_id: string
          name: string
          url: string
          icon: string
          sort_order?: number
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          portfolio_id?: string
          name?: string
          url?: string
          icon?: string
          sort_order?: number
        }
      }
      contact_messages: {
        Row: {
          id: string
          created_at: string
          portfolio_id: string
          name: string
          email: string
          subject?: string
          message: string
          read: boolean
          replied: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          portfolio_id: string
          name: string
          email: string
          subject?: string
          message: string
          read?: boolean
          replied?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          portfolio_id?: string
          name?: string
          email?: string
          subject?: string
          message?: string
          read?: boolean
          replied?: boolean
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
      project_status: 'completed' | 'in-progress' | 'planned'
      skill_category: 'frontend' | 'backend' | 'database' | 'tools' | 'other'
    }
  }
}