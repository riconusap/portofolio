import { ref, computed } from 'vue'
import { supabase } from './client'
import type { Database } from './types'

type Portfolio = Database['public']['Tables']['portfolios']['Row']
type Project = Database['public']['Tables']['projects']['Row']
type Skill = Database['public']['Tables']['skills']['Row']
type Experience = Database['public']['Tables']['experiences']['Row']
type SocialLink = Database['public']['Tables']['social_links']['Row']

export const useSupabase = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Auth functions
  const auth = {
    async signUp(email: string, password: string) {
      loading.value = true
      error.value = null
      
      try {
        const { data, error: authError } = await supabase.auth.signUp({
          email,
          password
        })
        
        if (authError) throw authError
        return data
      } catch (err) {
        error.value = err instanceof Error ? err.message : 'An error occurred'
        throw err
      } finally {
        loading.value = false
      }
    },

    async signIn(email: string, password: string) {
      loading.value = true
      error.value = null
      
      try {
        const { data, error: authError } = await supabase.auth.signInWithPassword({
          email,
          password
        })
        
        if (authError) throw authError
        return data
      } catch (err) {
        error.value = err instanceof Error ? err.message : 'An error occurred'
        throw err
      } finally {
        loading.value = false
      }
    },

    async signOut() {
      loading.value = true
      error.value = null
      
      try {
        const { error: authError } = await supabase.auth.signOut()
        if (authError) throw authError
      } catch (err) {
        error.value = err instanceof Error ? err.message : 'An error occurred'
        throw err
      } finally {
        loading.value = false
      }
    },

    async getCurrentUser() {
      const { data: { user } } = await supabase.auth.getUser()
      return user
    }
  }

  // Database functions
  const database = {
    // Portfolio operations
    async getPortfolio(userId: string): Promise<Portfolio | null> {
      loading.value = true
      error.value = null
      
      try {
        const { data, error: dbError } = await supabase
          .from('portfolios')
          .select('*')
          .eq('user_id', userId)
          .single()
        
        if (dbError) throw dbError
        return data
      } catch (err) {
        error.value = err instanceof Error ? err.message : 'An error occurred'
        return null
      } finally {
        loading.value = false
      }
    },

    async createPortfolio(portfolio: Database['public']['Tables']['portfolios']['Insert']): Promise<Portfolio | null> {
      loading.value = true
      error.value = null
      
      try {
        const { data, error: dbError } = await supabase
          .from('portfolios')
          .insert(portfolio)
          .select()
          .single()
        
        if (dbError) throw dbError
        return data
      } catch (err) {
        error.value = err instanceof Error ? err.message : 'An error occurred'
        return null
      } finally {
        loading.value = false
      }
    },

    async updatePortfolio(id: string, updates: Database['public']['Tables']['portfolios']['Update']): Promise<Portfolio | null> {
      loading.value = true
      error.value = null
      
      try {
        const { data, error: dbError } = await supabase
          .from('portfolios')
          .update(updates)
          .eq('id', id)
          .select()
          .single()
        
        if (dbError) throw dbError
        return data
      } catch (err) {
        error.value = err instanceof Error ? err.message : 'An error occurred'
        return null
      } finally {
        loading.value = false
      }
    },

    // Project operations
    async getProjects(portfolioId: string): Promise<Project[]> {
      loading.value = true
      error.value = null
      
      try {
        const { data, error: dbError } = await supabase
          .from('projects')
          .select('*')
          .eq('portfolio_id', portfolioId)
          .order('sort_order', { ascending: true })
        
        if (dbError) throw dbError
        return data || []
      } catch (err) {
        error.value = err instanceof Error ? err.message : 'An error occurred'
        return []
      } finally {
        loading.value = false
      }
    },

    async createProject(project: Database['public']['Tables']['projects']['Insert']): Promise<Project | null> {
      loading.value = true
      error.value = null
      
      try {
        const { data, error: dbError } = await supabase
          .from('projects')
          .insert(project)
          .select()
          .single()
        
        if (dbError) throw dbError
        return data
      } catch (err) {
        error.value = err instanceof Error ? err.message : 'An error occurred'
        return null
      } finally {
        loading.value = false
      }
    },

    // Skills operations
    async getSkills(portfolioId: string): Promise<Skill[]> {
      loading.value = true
      error.value = null
      
      try {
        const { data, error: dbError } = await supabase
          .from('skills')
          .select('*')
          .eq('portfolio_id', portfolioId)
          .order('sort_order', { ascending: true })
        
        if (dbError) throw dbError
        return data || []
      } catch (err) {
        error.value = err instanceof Error ? err.message : 'An error occurred'
        return []
      } finally {
        loading.value = false
      }
    },

    // Contact message operations
    async createContactMessage(message: Database['public']['Tables']['contact_messages']['Insert']): Promise<boolean> {
      loading.value = true
      error.value = null
      
      try {
        const { error: dbError } = await supabase
          .from('contact_messages')
          .insert(message)
        
        if (dbError) throw dbError
        return true
      } catch (err) {
        error.value = err instanceof Error ? err.message : 'An error occurred'
        return false
      } finally {
        loading.value = false
      }
    }
  }

  // Storage functions
  const storage = {
    async uploadFile(bucket: string, path: string, file: File): Promise<string | null> {
      loading.value = true
      error.value = null
      
      try {
        const { data, error: storageError } = await supabase.storage
          .from(bucket)
          .upload(path, file)
        
        if (storageError) throw storageError
        
        const { data: urlData } = supabase.storage
          .from(bucket)
          .getPublicUrl(path)
        
        return urlData.publicUrl
      } catch (err) {
        error.value = err instanceof Error ? err.message : 'An error occurred'
        return null
      } finally {
        loading.value = false
      }
    },

    async deleteFile(bucket: string, path: string): Promise<boolean> {
      loading.value = true
      error.value = null
      
      try {
        const { error: storageError } = await supabase.storage
          .from(bucket)
          .remove([path])
        
        if (storageError) throw storageError
        return true
      } catch (err) {
        error.value = err instanceof Error ? err.message : 'An error occurred'
        return false
      } finally {
        loading.value = false
      }
    }
  }

  return {
    loading: computed(() => loading.value),
    error: computed(() => error.value),
    auth,
    database,
    storage,
    supabase
  }
}

export default useSupabase